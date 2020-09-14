function webExplorer(id, server) {
    const weModal = 
        '<div class="we-modal-content modal-dialog modal-lg">' +
            '<div class="modal-content">' +
                '<div class="modal-header">' +
                    '<h5 class="modal-title" id="we-modal-title"></h5>' +
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                    '<span aria-hidden="true">&times;</span>' +
                    '</button>' +
                '</div>' +
                '<div class="modal-body" id="we-modal-content"></div>' +
                '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
                '</div>' +
            '</div>' +
        '</div>';

    let cm = document.createElement('div');
    cm.id = 'we-context-outer';
    cm.classList.add('we-context')
    cm.classList.add('card');
    cm.innerHTML = '<nav id="we-context" class="nav flex-column"></nav>';
    document.body.appendChild(cm);


    let we = {};
    


    we.e = document.getElementById(id);

    we.contextMenu = document.getElementById('we-context');
    we.contextMenuOuter = document.getElementById('we-context-outer');

    we.modal = document.createElement('div');
    we.modal.id = 'we-modal'
    we.modal.innerHTML = weModal;

    we.path = '/';
    we.server = server,
    we.data = {};
    we.clipboard = {};
    we.clipboard.items = {};
    we.clipboard.cut = false;
    we.actionMethods = {
        list: 'GET',
        view: 'GET',
        create_file: 'GET',
        create_dir: 'GET',
        delete: 'GET',
        rename: 'GET',
        copy: 'GET'
    }

    document.body.appendChild(we.modal);

    document.addEventListener('click', function() {
        we.hideContext();
    });

    we.settings = {
        rows: ['icon', 'name', 'mime', 'path', 'size'],
        renderRow: {
            icon: function (file) {
                const icon = (function() {

                    if(file.type === 'dir') {
                        return we.settings.icons['directory'];
                    }

                    if (we.settings.icons[file.mime]) {
                        return we.settings.icon[file.mime];
                    }

                    const group = file.mime.split('/')[0];

                    if (we.settings.icons[group]) {
                        return we.settings.icons[group];
                    }

                    if(we.settings.icons[file.extension]) {
                        return we.settings.icons[file.extension];
                    }

                    return we.settings.icons['default'];
                })();

                return '<td><i class="fas fa-' + icon + '"></i></td>'; 
            },
            size: function(file) {

                if (!file.size) {
                    return '<td></td>';
                }

                if (file.size === 0) {
                    return '<td>0 Bytes</td>';
                } 

                var k = 1024,
                    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                    i = Math.floor(Math.log(file.size) / Math.log(k));

                return '<td>' + parseFloat((file.size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i] + '</td>';
            }
        },
        fileHandler: {
            'audio': 'we-audio',
            'video': 'we-video',
            'image': 'we-image',
            'text': 'we-text',

            'application/json': 'we-text',

            'default': 'we-unkown-file'
        },
        icons: {
            'audio': 'file-audio',
            'video': 'file-video',
            'image': 'file-image',
            'text': 'file-alt',

            'directory': 'folder',
            'default': 'file'
        },

        app: {

            'we-copy': function(we, file) {
                we.clipboard.items = we.selection.items;
                we.clipboard.path = file.path;
                we.clipboard.cut = false;
            },

            'we-cut': function(we, file) {
                we.clipboard.items = we.selection.items;
                we.clipboard.path = file.path;
                we.clipboard.cut = true;
            },

            'we-download': function(we, file) {
                window.location.href = we.server + '?action=download&file=' + file.path;
            },

            'we-delete': function(we) {
                Object.values(we.selection.items).forEach(function(selectedFile) {
                    we.requestFile('delete', selectedFile.path);
                    we.openDir(we.path);
                });
            },

            'we-create-file': function(we, file, e) {
                we.createTrInput(e.weTargetElement, function() {

                    console.log('abcas');

                    let create = we.path;
                    if (create !== '/') {
                        create += '/';
                    }

                    we.requestFile('create_file', create + this.value).then(function() {
                        we.openDir(we.path);
                    });
                });
            },

            'we-create-dir': function(we, file, e) {
                console.log('abc');

                we.createTrInput(e.weTargetElement, function() {

                    
                    let create = we.path;
                    if (create !== '/') {
                        create += '/';
                    }

                    we.requestFile('create_dir', create + this.value).then(function() {
                        we.openDir(we.path);
                    }); 
                });
            },

            'we-audio': function(we, file) {
                we.openModal('View: ' + file.name, 
                    '<audio controls class="w-100 no-outline">' +
                        '<source ' +
                            'src="' + we.server + '?action=view&file=' + file.path + '" ' +
                            'type="' + file.mime + '"' +
                        '>' +
                    '</audio>'
                );
            },

            'we-image': function(we, file) {
                we.openModal('View: ' + file.name, 
                    '<img class="w-100" src="' + we.server + '?action=view&file=' + file.path + '">'
                );
            },

            'we-text': function(we, file) {

                we.requestFile('view', file.path).then(function(response) {

                    we.openModal('View: ' + file.name, '<pre>' + response.xhr.responseText + '</pre>');

                });
            },

            'we-unkown-file': function(we, file) {
                we.openModal('View: ' + file.name, 'No file viewer is integrated');
            },

            'we-video': function(we, file) {
                we.openModal('View: ' + file.name, 
                    '<video controls class="w-100">' +
                        '<source ' +
                            'src="' + we.server + '?action=view&file=' + file.path + '" ' +
                            'type="' + file.mime + '"' +
                        '>' +
                    '</video>'
                );
            },

            'we-back': function(we) {
                we.openDir(we.getParent());
            },

            'we-open': function(we, file) {

                if(file.type === 'dir') {
                    we.openDir(file.path);
                } else {

                    const app = (function() {
                        if (we.settings.fileHandler[file.mime]) {
                            return we.settings.fileHandler[file.mime];
                        }

                        const group = file.mime.split('/')[0];

                        if (we.settings.fileHandler[group]) {
                            return we.settings.fileHandler[group];
                        }

                        if(we.settings.fileHandler[file.extension]) {
                            return we.settings.fileHandler[file.extension];
                        }

                        return we.settings.fileHandler['default'];
                    })();

                    if(!app || !we.settings.app[app]) {
                        throw new Error('Invalid app: ' +  app);
                    }

                    we.settings.app[app](we, file);
                }

            },

            'we-paste': function(we, file) {
                Object.values(we.clipboard.items).forEach(function(item) {
                    if (we.clipboard.cut) {

                        let path = we.path;
                        if (we.path !== '/') {
                            path = path + '/';
                        }

                        we.requestFile('rename', item.path, {to: path + item.name}).then(() => {
                            we.openDir(we.path);
                        });
                    }
                });
            }
        },

        contextOrder: ['open', 'download', '-', 'delete', 'copy', 'cut', 'paste', '-', 'create-dir', 'create-file'],
        contextMenu: {

            'open': {
                text: '<b>Open</b>',
                app: 'we-open'
            },

            'download': {
                text: 'Download',
                app: 'we-download',
                condition: (we, file) => file.type === 'file'
            },

            'copy': {
                app: 'we-copy',
                text: 'Copy',
                condition: (we, file) => !!file.name
            },

            'delete': {
                text: 'Delete',
                app: 'we-delete',
                condition: (we, file) => !!file.name
            },

            'cut': {
                text: 'Cut',
                app: 'we-cut',
                condition: (we, file) => !!file.name
            },

            'paste': {
                text: 'Paste',
                app: 'we-paste',
                condition: function(we) {
                    return Object.keys(we.clipboard.items).length !== 0;
                }
            },

            'create-dir': {
                text: 'Create Directory',
                app: 'we-create-dir'
            },

            'create-file': {
                text: 'Create File',
                app: 'we-create-file'
            },
        }
    }

    we.createTrInput = function(after, complete) {

        let tr = document.createElement('tr');
            tr.innerHTML = 
                '<td colspan="' + we.settings.rows.length + '">' + 
                    '<input type="text" class="form-control" placeholder="Name">'
                '</td>';
        after.parentNode.insertBefore(tr, after.nextSibling);

        let input = tr.querySelector('input');

        input.select();
        input.addEventListener('blur', complete);
        input.addEventListener('keypress', function(e) {
            if(e.which === 13 /* Enter */) {
                this.blur();
            }
        });
    };

    we.isDirEmpty = function() {
        return we.data.length === 0;
    }

    we.getParent = function() {
        let split = we.path.split('/');
        split.pop();

        return split.join('/');
    }

    we.requestFile = function(action, file, data = {}) {

        if (!this.actionMethods[action]) {
            throw new Error('Unsupported action: ' + action);
        }

        data.file = file;

        const xhr = new XMLHttpRequest();
        const method = this.actionMethods[action];

        return new Promise(function(resolve, reject) {

            let url = we.server + '?action=' + action;
            const query = Object.keys(data)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
                .join('&');

            if(method === 'GET') {
                url += '&' + query;
            } else {
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            }
    
            xhr.open(method, url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {

                    let result = {
                        xhr: xhr,
                        action: action,
                        file: file,
                        data: xhr.getResponseHeader('Content-Type') === 'application/json'
                            ? JSON.parse(xhr.responseText)
                            : []
                    };

                    if (xhr.status.toString()[0] === '2') {
                        resolve(result);
                    } else {
                        we.reportError(result);
                        reject(result);
                    }


                }
            };
    
            if(method === 'GET') {
                xhr.send();
            } else {
                xhr.send(query);
            }
        });
    };

    we.selection = {};
    we.selection.items = {};
    we.selection.clear = function() {
        Array.prototype.slice.call(we.e.children).forEach(function(child) {
            we.selection.items = {};
            child.classList.remove('we-selected');
        });

    };
    we.selection.select = function(index) {
        we.selection.items[index] = we.data[index];
        we.e.querySelector('[data-index="' + index + '"]').classList.add('we-selected');
    };

    we.reportError = function(response) {

        const body = 
            '<p>Error occurred while performing <code>' + response.action + '</code> on file <code>' + response.file + '</code></p>' +
            '<p>Details:</p>' + 
            '<table class="table table-bordered">' +
                '<tr>' + 
                    '<td>Message</td>' +
                    '<td>' + response.data.message + '</td>' +
                '</tr>' +
                '<tr>' + 
                    '<td>Error</td>' +
                    '<td>' + response.data.error + '</td>' +
                '</tr>' +
                '<tr>' + 
                    '<td>HTTP Status</td>' +
                    '<td>' + response.xhr.status + ' ' + response.xhr.statusText + '</td>' +
                '</tr>' +
            '</table>';

        we.openModal('Oops an error occurred', body);
    }

    we.openDir = function(path) {
        
        we.e.classList.add('we-loading');

        return we.requestFile('list', path, {})
            .then(function (response) {        
                path = path === '' ? '/' : path;

                document.querySelectorAll("[data-content='we-current']").forEach(function(e) {
                    e.innerHTML = path;
                })

                we.e.classList.remove('we-loading');
                
                let html = '';
                let before = 0;
                
                if (path !== '/') {
                    html += '<tr data-app="we-back" class="we-row">';
                    we.settings.rows.every(function(value) {

                        if(value === 'name') {
                            return false;
                        }

                        before++;

                        return true;
                    });

                    let after = we.settings.rows.length - before - 1;
                    if(before > 0) {
                        html += '<td colspan="' + before + '"></td>'
                    }

                    html += '<td>..</td>';

                    if(after > 0) {
                        html += '<td colspan="' + after + '"></td>'
                    }

                    html += '</tr>';
                }

                we.data = response.data;
                response.data.forEach(function(file, index) {
                    html += we.renderRow(file, index);
                });

                we.e.innerHTML = html;
                we.parent = we.path;
                we.path = path;
            })
            .then(function() {

                we.e.querySelectorAll('tr').forEach(function(e) {

                    e.addEventListener('click', function(e) {
                        if (!this.dataset.index) {
                            return;
                        }

                        we.selection.clear();
                        we.selection.select(this.dataset.index);
                    });

                    e.addEventListener('contextmenu', function(contextEvent) {

                        contextEvent.weTargetElement = this;
                        
                        let file = {};
                        if (this.dataset.index) {
                            we.selection.clear();
                            we.selection.select(this.dataset.index);

                            file = we.data[this.dataset.index];
                        }

                        contextEvent.preventDefault();

                        we.contextMenuOuter.style.left = contextEvent.pageX + 'px';
                        we.contextMenuOuter.style.top = contextEvent.pageY + 'px';
                        we.contextMenuOuter.style.display = 'block';

                        we.contextMenu.innerHTML = '';
                        we.settings.contextOrder.forEach(function(entry) {

                            let a = document.createElement('a');
                            a.href = '#';
                            a.classList.add('nav-link');

                            if (entry === '-') {
                                a.classList.add('separator');
                                we.contextMenu.appendChild(a); 
                            } else {

                                if(!we.settings.contextMenu[entry]) {
                                    throw new Error('Invalid Context Entry: ' + entry);
                                }

                                entry = we.settings.contextMenu[entry];
                                a.innerHTML = entry.text;

                                if (entry.app) {
                                    if(!we.settings.app[entry.app]) {
                                        throw new Error('Invalid app: ' + entry.app);
                                    }

                                    a.addEventListener('click', function() {
                                        we.settings.app[entry.app](we, file, contextEvent);
                                    });
                                }

                                if (!entry.condition || entry.condition(we, file)) {
                                    we.contextMenu.appendChild(a);
                                }
                            }
                        });


                    });

                    e.addEventListener('dblclick', function() {

                        if(!this.dataset.app) {
                            return;
                        }

                        const app = we.settings.app[this.dataset.app];
                        if(!app) {
                            throw new Error('Invalid app: ' + this.dataset.app);
                        }

                        app(
                            we, 
                            this.dataset.index && we.data[this.dataset.index]
                                ? we.data[this.dataset.index]
                                : {},
                            this
                        );
                    });

                    e.addEventListener('dragover', function(e) {
                        if (this.dataset.app || (we.data[this.dataset.index] && we.data[this.dataset.index].type === 'dir')) {
                            e.preventDefault();
                        }
                    });

                    e.addEventListener('dragstart', function(e) {
                        e.dataTransfer.setData('application/we-file-index', this.dataset.index);
                    });

                    e.addEventListener('drop', function(e) {
                        e.preventDefault();
                        const id = e.dataTransfer.getData('application/we-file-index');

                        if(id === '' || id === this.dataset.index || !we.data[id]) {
                            return;
                        }
                        
                        const item = we.data[id];
                        let path = we.path;
                        if (we.path !== '/') {
                            path = path + '/';
                        }


                        const dir = this.dataset.app === 'we-back' ? we.getParent() : path + we.data[this.dataset.index].name;
                        

                        we.requestFile('rename', item.path, {to: dir + '/'  + item.name}).then(() => {
                            we.openDir(we.path);
                        });
                    });
                });

                we.selection.clear();

            });
    };
    
    we.hideContext = function()  {
        we.contextMenuOuter.style.display = 'none';
    }

    we.renderRow = function(file, index) {

        let row = '<tr class="we-row" draggable="true" data-app="we-open" data-index="' + index + '">';

        this.settings.rows.forEach(function(rowName) {

            row += function() {

                if (we.settings.renderRow[rowName] instanceof Function) {
                    return we.settings.renderRow[rowName](file, rowName, this);
                }

                if (typeof file[rowName] === 'undefined') {
                    return '<td></td>';
                }

                return '<td>' + file[rowName] + '</td>';
            }();

        });


        return row + '</tr>';        
    };

    we.openModal = function(title, content) {

        document.getElementById('we-modal-title').innerHTML = title;
        document.getElementById('we-modal-content').innerHTML = content;

        we.modal.style.display = 'block';

        document.querySelectorAll('[data-dismiss="modal"]').forEach(function(e) {

            e.addEventListener('click', function() {
                we.modal.style.display = 'none';

                document.getElementById('we-modal-title').innerHTML = '';
                document.getElementById('we-modal-content').innerHTML = '';

            });
        });
    };

    we.e.classList.add('we');
    we.openDir('/');

    return we;
}