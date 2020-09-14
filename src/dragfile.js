export default function DragFile(we) {

    we.addRowListener('dragover', rowEvent => {
        const data = rowEvent.target.dataset;

        if (data.app === 'back' || (we.data[data.index] && we.data[data.index].type === 'dir')) {
            rowEvent.event.preventDefault();
        }
    });

    we.addRowListener('dragstart', rowEvent =>
        rowEvent.event.dataTransfer.setData('application/we-file-index', rowEvent.target.dataset.index)
    );

    we.addRowListener('drop', rowEvent => {
        rowEvent.event.preventDefault();
    
        const id = rowEvent.event.dataTransfer.getData('application/we-file-index');
        const data = rowEvent.target.dataset;

        if(id === '' || id === data.index || !we.data[id]) {
            return;
        }
        
        const item = we.data[id];
        let path = we.path;
        if (we.path !== '/') {
            path = path + '/';
        }

        const dir = data.app === 'back' ? we.getParent() : path + we.data[data.index].name;
        
        we.client.request('rename', item.path, {to: dir + '/'  + item.name}).then(() => {
            we.openDir(we.path);
        });
    });
};