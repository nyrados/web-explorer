export default class FileClipboard {

    clipboard = [];
    isCut = false;

    constructor(we) {
        this.we = we;
    }

    clear() {
        this.clipboard = [];
    }

    copy(file) {

        if (this.isCut) {
            this.clear();
            this.isCut = false;
        }

        this.add(file);
    }

    add(file) {
        this.clipboard.push(file);
    }

    cut(file) {
        if(!this.isCut) {
            this.clear();
            this.isCut = true;
        }

        this.add(file);
    }
}