class DragFile {

    constructor(we) {
        this.we = we;
    }

    register() {
        we.addRowListener('dragover', e => this.over(e));
        we.addRowListener('dragstart', e => this.start(e));
        we.addRowListener('stop', e => this.stop(e));
    }

    start(rowEvent) {
        rowEvent.event.dataTransfer.setData('application/we-file-index', rowEvent.target.dataset.index)
    }

    over(rowEvent) {
        const data = rowEvent.target.dataset;

        if (data.app === 'back' || (we.data[data.index] && this.we.data[data.index].type === 'dir')) {
            rowEvent.event.preventDefault();
        }
    }

    drop(rowEvent) {
        rowEvent.event.preventDefault();
    
        const id = rowEvent.event.dataTransfer.getData('application/we-file-index');
        const data = rowEvent.target.dataset;

        if(id === '' || id === data.index || !we.data[id]) {
            return false;
        }
        
        let path = we.path;
        if (this.we.path !== '/') {
            path = path + '/';
        }

        const location = data.app === 'back' ? we.getParent() : path + this.we.data[data.index].name;

        this.we.selection.each(item => 
            we.client.request('rename', item.path, {to: location + '/' + item.name})
                .then(() => we.refresh())
        );
    }

}