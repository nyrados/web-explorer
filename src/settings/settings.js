export const settings = {
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
        'audio': 'we-viewer-audio',
        'video': 'we-viewer-video',
        'image': 'we-viewer-image',
        'text': 'we-viewer-text',

        'application/json': 'we-viewer-text',

        'default': 'we-viewer-default'
    },
    icons: {
        'audio': 'file-audio',
        'video': 'file-video',
        'image': 'file-image',
        'text': 'file-alt',

        'directory': 'folder',
        'default': 'file'
    },
    menu: {
        order: ['open', 'download', '-', 'delete', 'copy', 'cut', 'paste', '-', 'create-dir', 'create-file'],
        items: {
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
                before: 'we-clipboard-clear',
                multiple: true,
                condition: (we, file) => !!file.name
            },
    
            'delete': {
                text: 'Delete',
                app: 'we-delete',
                multiple: true,
                condition: (we, file) => !!file.name
            },
    
            'cut': {
                text: 'Cut',
                app: 'we-cut',
                before: 'we-clipboard-clear',
                multiple: true,
                condition: (we, file) => !!file.name
            },
    
            'paste': {
                text: 'Paste',
                app: 'we-paste',
                condition: function(we) {
                    return true || Object.keys(we.clipboard.items).length !== 0;
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
};