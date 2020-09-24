export default class RowEvent {

    constructor(we, target, event) {

        this.target = target;
        this.event = event;
        this.we = we;

        if (target.dataset.index) {
            this.index = parseInt(target.dataset.index);
            this.file = we.data[target.dataset.index];
        }
    }

}