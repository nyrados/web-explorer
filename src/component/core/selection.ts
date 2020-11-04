import RowEvent from "../../event/row";
import File from "../../file";
import WebExplorer from "../../we";

export default class Selection {

    items: {
        [key: number]: File
    };

    private we: WebExplorer;

    constructor(we: WebExplorer) {
        this.we = we;
        this.we.addRowListener('click', rowEvent => this.clickListener(rowEvent));
        this.we.addRowListener('contextmenu', rowEvent => this.contextListener(rowEvent));
    }

    clear(): void {
        this.items = {};

        Array.prototype.slice.call(this.we.e.children).forEach((child: Element) => {
            child.classList.remove('we-selected');
        });
    } 

    select(index: number | number[]) {
        this.clear();

        if(!Array.isArray(index)) {
            index = [index];
        }

        index.forEach((i: number) => {
            this.items[i] = this.we.data[i];
        
            this.we.e.querySelector('[data-index="' + i + '"]').classList.add('we-selected')
        });
    }

    each(callback: (file: File, index?: number) => void): void {
        Object.keys(this.items)
            .map(string => parseInt(string)) 
            .forEach(key => callback(this.items[key], key))
        ;
    }

    contextListener(rowEvent: RowEvent) {
        rowEvent.event.preventDefault();

        if (!rowEvent.target.dataset.index || this.items[parseInt(rowEvent.target.dataset.index)]) {
            return;
        }

        this.clear();
        this.select(parseInt(rowEvent.target.dataset.index));
    }

    clickListener(rowEvent: RowEvent) {

        const event = rowEvent.event as KeyboardEvent;
        const current = parseInt(rowEvent.target.dataset.index);

        let selected: number[] = [];

        // If ctrl or shift is pushed, all selected keys will stay in selection
        if (event.ctrlKey || event.shiftKey) {
            selected = Object.keys(this.items).map(string => parseInt(string));
        }

        if(event.shiftKey) {

            // The smallest selected index is smaller than the current (current is below)
            if (Math.min(...selected) < current) {

                // Go the row list down (via increaing index) and add all indexes until the current index is reached
                for(let i = Math.max(...selected) + 1; i < current; i++) {
                    selected.push(i);
                }
            } 
            
            else {

                // Go the list up (via decreasing) and add all indexes until the current index is reached
                for(let i = Math.min(...selected) - 1; i > current; i--) {
                    selected.push(i);
                }
            }
        }
        
        // Add current index to selection
        selected.push(current); 

        this.select(selected);
    }
}
