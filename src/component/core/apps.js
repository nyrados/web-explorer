import Open from "./open";

export default class Apps {

    apps = {};

    constructor(we) {
        this.we = we;

        this.set('open', (new Open(we)).get());
    }

    set(name, callback) {
        this.apps[name] = callback;
    }

    call(name, file = {}, event = {}) {

        if(!this.has(name)) {
            throw new Error('Invalid App: ' + name);
        }

        this.apps[name](this.we, file, event);
    }

    has(name) {
        return !!this.apps[name];
    }
}