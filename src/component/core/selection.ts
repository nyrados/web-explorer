import RowEvent from "../../event/row";
import File from "../../file";
import WebExplorer from "../../we";

export default class Selection {

    items: Array<File> = [];

    private we: WebExplorer;

    constructor(we: WebExplorer) {
        this.we = we;
        this.we.addRowListener('click', rowEvent => this.clickListener(rowEvent));
        this.we.addRowListener('contextmenu', rowEvent => this.contextListener(rowEvent));
    }

    clear(): void {
        this.items = [];

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
            this.we.e.querySelector('[data-index="' + index + '"]').classList.add('we-selected')
        });
    }

    each(callback: (file: File) => void): void {
        this.items.forEach(callback);
    }

    contextListener(rowEvent: RowEvent) {
        rowEvent.event.preventDefault();

        if (!rowEvent.target.dataset.index || this.items[rowEvent.target.dataset.index as unknown as number]) {
            return;
        }

        this.clear();
        this.select(rowEvent.target.dataset.index as unknown as number);
    }

    clickListener(rowEvent: RowEvent) {
        const event = rowEvent.event as KeyboardEvent;
        const current = rowEvent.target.dataset.index as unknown as number;
        let index: number[] = [];

        if (event.ctrlKey || event.shiftKey) {
            index = index.concat(Array.from(this.items.keys()));
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
