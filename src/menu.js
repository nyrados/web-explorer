export default class Menu {

    constructor(we) {

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

    openMenu(rowEvent) {
                        
        let file = {};

        if (rowEvent.target.dataset.index) {
            file = this.we.data[rowEvent.target.dataset.index];
        }

        rowEvent.event.preventDefault();

        this.outer.style.left = rowEvent.event.pageX + 'px';
        this.outer.style.top = rowEvent.event.pageY + 'px';
        this.outer.style.display = 'block';
        this.menu.innerHTML = '';

        this.order.forEach(item => this.renderItem(item, file, rowEvent));
    }

    renderItem(name, file, rowEvent) {
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

        if (!item.condition || item.condition(we, file)) {
            this.menu.appendChild(a);
        }
    }

    itemClick(item, file, rowEvent) {
        if(item.before) {
            this.we.apps.call(item.before, file, rowEvent);
        }

        if(item.multiple) {
            this.we.selection.each(selectedFile => 
                this.we.apps.call(item.app, selectedFile, rowEvent)
            );  
            return;
        }

        this.we.apps.call(item.app, file, rowEvent);
    }
}