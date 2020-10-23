import RowEvent from "../event/row";
import WebExplorer from "../we";

export default class DragFile {

    private we: WebExplorer;

    constructor(we: WebExplorer) {
        this.we = we;
    }

    register() {
        this.we.addRowListener('dragover', e => this.over(e));
        this.we.addRowListener('dragstart', e => this.start(e));
        this.we.addRowListener('drop', e => this.drop(e));
    }

    private start(rowEvent: RowEvent) {

        (rowEvent.event as DragEvent).dataTransfer.setData('application/we-file-index', rowEvent.target.dataset.index)
    }

    private over(rowEvent: RowEvent) {
        const data = rowEvent.target.dataset;
        const index = data.index as unknown as number;

        if (data.app === 'back' || (this.we.data[index] && this.we.data[index].type === 'dir')) {
            rowEvent.event.preventDefault();
        }
    }

    private drop(rowEvent: RowEvent) {

        rowEvent.event.preventDefault();
    
        const fileIndex = (rowEvent.event as DragEvent).dataTransfer.getData('application/we-file-index');
        const data = rowEvent.target.dataset;

        if(fileIndex === '' || parseInt(fileIndex) === parseInt(data.index) || !this.we.data[parseInt(fileIndex)]) {
            return false;
        }
        
        let path = this.we.path;
        if (this.we.path !== '/') {
            path = path + '/';
        }

        const location = data.app === 'back' ? this.we.getParent() : path + this.we.data[parseInt(data.index)].name;

        this.we.selection.each(item => 
            this.we.client.request('rename', item.path, {to: location + '/' + item.name})
                .then(() => this.we.refresh())
        );
    }

}