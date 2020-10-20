import File from "../../file";
import WebExplorer from "../../we";
import App from "../app/app";
import Open from "./open";

export default class Apps {

    apps: Record<string, App>;
    we: WebExplorer;

    constructor(we: WebExplorer) {
        this.we = we;

        this.set('open', (new Open(we)).get());
    }

    set(name: string, callback: App) {
        this.apps[name] = callback;
    }

    call(name: string, file?: File, event?: Event) {

        if(!this.has(name)) {
            throw new Error('Invalid App: ' + name);
        }

        this.apps[name](this.we, file, event);
    }

    has(name: string) {
        return !!this.apps[name];
    }
}