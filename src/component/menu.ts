import RowEvent from "../event/row";
import File from "../file";
import WebExplorer from "../we";

export interface ContextMenuSettings {
    order: Array<string>;
    items: Record<string, ContextMenuItem>;
};

export interface ContextMenuItem {
    text: string;
    app: string;
    condition?: (we: WebExplorer, file: File | {}) => boolean;
    before?: string;
    multiple?: boolean;
}

export default class Menu {


    private we: WebExplorer;
    private order: Array<string>;
    private items: Record<string, ContextMenuItem>;
    
    private outer: HTMLElement;
    private menu: HTMLElement;

    constructor(we: WebExplorer) {
        this.we = we;

        this.order = we.settings.menu.order;
        this.items = we.settings.menu.items;

        this.outer = document.createElement('div');
        this.outer.id = 'we-context-outer';
        this.outer.classList.add('we-context')
        this.outer.classList.add('card');
        this.outer.innerHTML = '<nav id="we-context" class="nav flex-column"></nav>';

        document.body.appendChild(this.outer);

        this.menu = document.getElementById('we-context');

        we.addRowListener('contextmenu', rowEvent => this.openMenu(rowEvent));

        document.addEventListener('click', () => this.outer.style.display = 'none');
    }

    openMenu(rowEvent: RowEvent) {
                        
        let file: File | {} = {};

        if (rowEvent.target.dataset.index) {
            file = this.we.data[rowEvent.target.dataset.index as unknown as number];
        }

        rowEvent.event.preventDefault();

        const event = rowEvent.event as MouseEvent;

        this.outer.style.left = event.pageX + 'px';
        this.outer.style.top = event.pageY + 'px';
        this.outer.style.display = 'block';
        this.menu.innerHTML = '';

        this.order.forEach(item => this.renderItem(item, file, rowEvent));
    }

    renderItem(name: string, file: File | {}, rowEvent: RowEvent) {
        let a = document.createElement('a');
        a.href = '#';
        a.classList.add('nav-link');

        if (name === '-') {
            a.classList.add('separator');
            this.menu.appendChild(a); 
            
            return;
        }

        if(!this.items[name]) {
            throw new Error('Invalid Context Entry: ' + name);
        }

        const item = this.items[name];
        a.innerHTML = item.text;

        if (item.app) {
            a.addEventListener('click', () => this.itemClick(item, file, rowEvent));
        }

        if (!item.condition || item.condition(this.we, file)) {
            this.menu.appendChild(a);
        }
    }

    itemClick(item: ContextMenuItem, file: File | {}, rowEvent: RowEvent) {
        if(item.before) {
            this.we.apps.call(item.before, file, rowEvent);
        }

        if(item.multiple) {
            this.we.selection.each((selectedFile: File) => 
                this.we.apps.call(item.app, selectedFile, rowEvent)
            );  
            return;
        }

        this.we.apps.call(item.app, file, rowEvent);
    }
}