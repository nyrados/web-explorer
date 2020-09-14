export default class FileClipboard {

    clipboard = [];
    isCut = false;
    items = [];

    constructor(we) {
        this.we = we;
    }

    clear() {
        this.clipboard = [];
    }

    copy(index) {
        if (this.isCut) {
            this.clear();
            this.isCut = false;
        }

        this.add(index);
    }

    add(index) {
        this.items.push(this.we.data[index])
        this.clipboard.push(index);
    }

    cut(index) {
        if(!this.isCut) {
            this.clear();
            this.isCut = true;
        }

        this.add(index);
    }
}