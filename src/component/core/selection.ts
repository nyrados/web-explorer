import RowEvent from "../../event/row";
import File from "../../file";
import WebExplorer from "../../we";

export default class Selection {

    items: Record<number, File> = {};

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

        let index: number[] = [];

        if (event.ctrlKey || event.shiftKey) {
            index = index.concat(
                Object.keys(this.items).map(string => parseInt(string))
            );
        }

        if(event.shiftKey && index.length > 0) {
            if (Math.min(...index) < current) {
                for(let i = Math.max(...index) + 1; i < current; i++) {
                    index.push(i);
                }
            } else {
                for(let i = Math.min(...index) - 1; i > current; i--) {
                    index.push(i);
                }
            }
        }
        
        if (current || current === 0) {
            index.push(current); 
        }

        this.select(index);
    }
}
