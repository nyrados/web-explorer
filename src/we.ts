
import Modal from './component/modal';
import Client, { ServerResponse } from './component/core/client';
import Selection from './component/core/selection';
import RowEvent from './event/row';
import Apps from './component/core/apps';
import File from './file';
import { Settings } from './settings';

export default class WebExplorer {

    public data: Array<File> = [];
    public settings: Settings;
    public path: string = '/';
    
    public modal: Modal = new Modal();
    public client: Client;
    public apps: Apps;
    public selection: Selection;

    public e: Element;

    private rowListener: {[key: string]: Array<Function>} = {};

    constructor(id: string, server: string, settings: Settings) {

        this.settings = settings;

        // Dependencies
        this.modal = new Modal();
        this.client = new Client(server);
        this.apps = new Apps(this);
        this.selection = new Selection(this);

        // DOM
        this.e = document.getElementById(id);
        this.e.classList.add('we');
        
        // Initialization
        this.apps.set('back', () => this.openDir(this.getParent()));
        this.addRowListener('dblclick', (rowEvent: RowEvent) => {
            if(rowEvent.file) {
                return this.apps.call('open', rowEvent.file, rowEvent.event);
            }

            if(rowEvent.target.dataset.app) {
                return this.apps.call(rowEvent.target.dataset.app, null, rowEvent.event);
            }
        });
    };

    refresh() {
        this.openDir(this.path);
    }

    getParent() {
        let split = this.path.split('/');
        split.pop();

        return split.join('/');
    }

    addRowListener(event: string, callback: (rowevent: RowEvent) => any) {
        
        if(!Array.isArray(this.rowListener[event])) {
            this.rowListener[event] = [];
        }

        this.rowListener[event].push(callback);
    }

    setSettings(settings: Settings) {
        this.settings = settings;
    }

    async openDir(path: string) {

        const we = this;

        path = path === '' ? '/' : path;

        return this.client.request('list', path)
            .then((response: ServerResponse) => {

                this.path = path;

                response.data.forEach((value: string, index: number) => {
                    response.data[index]['index'] = index;
                });

                we.data = response.data as Array<File>;

                document.querySelectorAll("[data-content='we-current']").forEach(function(e) {
                    e.innerHTML = path;
                });

                let html = '';

                if (path !== '/') {
                    // Render Back Row at first tr
                    html += (() => {
                        let before = 0;
                        let tr = '<tr data-app="back" class="we-row">';
                        
                        this.settings.rows.every((value: string) => {
                            if(value === 'name') {
                                return false;
                            }

                            before++;


                            return true;
                        });

                        let after = this.settings.rows.length - before - 1;
                        if(before > 0) {
                            tr += '<td colspan="' + before + '"></td>'
                        }

                        tr += '<td>..</td>';

                        if(after > 0) {
                           tr += '<td colspan="' + after + '"></td>'
                        }

                        return tr + '</tr>';
                    })();
                }

                response.data.forEach((file: File, index: number) => html += this.renderRow(file, index));
                we.e.innerHTML = html;
            })

            .then(() =>
                we.e.querySelectorAll('tr').forEach(e =>
                    Object.keys(this.rowListener).forEach(event => 
                        this.rowListener[event].forEach(listener => 
                            e.addEventListener(event, rowEvent => listener(new RowEvent(this, e, rowEvent)))
                        )
                    )
                )
            );
    }

    private renderRow(file: File, index: number): string {
        let row = '<tr class="we-row" draggable="true" data-app="we-open" data-index="' + index + '">';

        this.settings.rows.forEach((rowName: string) => 
            row += (() => {
                if (this.settings.renderRow[rowName] instanceof Function) {
                    return this.settings.renderRow[rowName](file, this);
                }

                if(file.hasOwnProperty(rowName)) {
                    return '<td>' + file[rowName] + '</td>'
                }

                return '<td></td>';
            })()
        );

        return row + '</tr>';      
    }
}