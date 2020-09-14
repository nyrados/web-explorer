export default class Selection {

    items = {};

    constructor(we) {
        this.we = we;
        this.we.addRowListener('click', rowEvent => this.clickListener(rowEvent));
        this.we.addRowListener('contextmenu', rowEvent => this.contextListener(rowEvent));
    }

    clear() {
        this.items = {};

        Array.prototype.slice.call(this.we.e.children).forEach(function(child) {
            child.classList.remove('we-selected');
        });
    } 

    select(index) {
        this.clear();

        if(!Array.isArray(index)) {
            index = [parseInt(index)];
        }

        index.forEach(index => {
            this.items[parseInt(index)] = this.we.data[index];
            this.we.e.querySelector('[data-index="' + index + '"]').classList.add('we-selected')
        });
    }

    each(callback) {
        Object.values(this.items).forEach(file => callback(file));
    }

    contextListener(rowEvent) {
        rowEvent.event.preventDefault();

        if (!rowEvent.target.dataset.index || this.items[rowEvent.target.dataset.index]) {
            return;
        }

        this.clear();
        this.select(rowEvent.target.dataset.index);
    }

    clickListener(rowEvent) {

        const event = rowEvent.event;
        const current = rowEvent.target.dataset.index;
        let index = [];
        
        
        if (event.ctrlKey || event.shiftKey) {
            index = index.concat(Object.keys(this.items));
        }

        index = index.map(index => parseInt(index));

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
            index.push(parseInt(current));
        }

        this.select(index);
    }
}
