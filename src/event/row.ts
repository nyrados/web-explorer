import File from "../file";
import WebExplorer from "../we";

export default class RowEvent {
    
    target: HTMLElement;
    event: Event;
    we: WebExplorer;

    index?: number;
    file?: File;

    constructor(we: WebExplorer, target: HTMLElement, event: Event) {
        this.target = target;
        this.event = event;
        this.we = we;

        if (target.dataset.index) {
            this.index = parseInt(target.dataset.index);
            this.file = we.data[target.dataset.index as unknown as number];
        }
    }

}