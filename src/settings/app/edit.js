export default function Edit(we) {
    
    we.apps.set('we-delete', (we, file) => {
        we.client.request('delete', file.path).then(() => we.refresh());
    });

    we.apps.set('we-download', (we, file) =>
        window.location.href = we.server + '?action=download&file=' + file.path
    );

    we.apps.set('we-clipboard-clear', we => we.clipboard.clear());
    we.apps.set('we-copy', (we, file, e) => we.clipboard.copy(e.target.dataset.index));
    we.apps.set('we-cut', (we, file, e) => we.clipboard.cut(e.target.dataset.index));

    we.apps.set('we-paste', (we) => {

        const mode = we.clipboard.isCut ? 'rename' : 'copy';
        let path = we.path;
        if (we.path !== '/') {
            path = path + '/';
        }

        we.clipboard.items.forEach(item => {
            we.client.request(mode, item.path, {to: path + item.name}).then(() => we.refresh());
        });
    });

    /*
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
    */
};