export default {
    rows: ['icon', 'name', 'mime', 'path', 'size'],
    renderRow: {
        icon: (file, we) => 
            '<td><i class="fas fa-'+ 
                (() => {
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
                })() + 
            '"></i></td>'
        ,

        size: file => {

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
        }
    }
};