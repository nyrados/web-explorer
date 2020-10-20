export default class FileClipboard {

    clipboard: Array<File> = [];
    isCut = false;

    clear(): void {
        this.clipboard = [];
    }

    copy(file: File): void {

        if (this.isCut) {
            this.clear();
            this.isCut = false;
        }

        this.add(file);
    }

    add(file: File): void {
        this.clipboard.push(file);
    }

    cut(file: File): void {
        if(!this.isCut) {
            this.clear();
            this.isCut = true;
        }

        this.add(file);
    }
}