import File from "../../file";
import WebExplorer from "../../we";

export default class Open {

    private rules: Record<string, string>;
    private we: WebExplorer;

    constructor(we: WebExplorer) {
        this.we = we;   
        this.rules = we.settings.fileHandler;
    }

    call(file: File) {

        if (file.type === 'dir') {
            return this.openDir(file);
        }

        return this.openFile(file);
    }

    get() {
        return (we: WebExplorer, file: File) => {
            this.call(file);
        }
    }

    private openDir(file: File) {
        this.we.openDir(file.path);
    }

    private openFile(file: File) {
        this.we.apps.call(this.fetchAppName(file), file);
    }

    private fetchAppName(file: File) {
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