export default class Open {

    rules = {};

    constructor(we) {
        this.we = we;   
        this.rules = we.settings.fileHandler;
    }

    call(file) {

        if (file.type === 'dir') {
            return this.openDir(file);
        }

        return this.openFile(file);
    }

    get() {
        return (we, file = {}, event = {}) => {
            this.call(file);
        }
    }

    openDir(file) {
        this.we.openDir(file.path);
    }

    openFile(file) {
        this.we.apps.call(this.fetchAppName(file), file);
    }

    fetchAppName(file) {
        if(this.rules[file.mime]) {
            return this.rules[file.mime];
        }
        
        const group = file.mime.split('/')[0];

        if (this.rules[group]) {
            return this.rules[group];
        }

        if(this.rules[file.extension]) {
            return this.rules[file.extension];
        }

        return this.rules.default;
    }

}