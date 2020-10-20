const template: string =
    `<div class="we-modal-content modal-dialog modal-lg">
        '<div class="modal-content">
            '<div class="modal-header">
                '<h5 class="modal-title" id="we-modal-title"></h5>
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">
                '<span aria-hidden="true">&times;</span>
                '</button>
            '</div>
            '<div class="modal-body" id="we-modal-content"></div>
            '<div class="modal-footer">
                '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            '</div>
        '</div>
    '</div>`;

export default class Modal {
    
    private modal: HTMLElement;

    constructor() {

        if (this.modal = document.getElementById('we-modal')) {
            return;
        }

        this.modal = document.createElement('div');
        this.modal.id = 'we-modal'
        this.modal.innerHTML = template;

        document.body.appendChild(this.modal);
    }

    open(title: string, content: string): void {
        document.getElementById('we-modal-title').innerHTML = title;
        document.getElementById('we-modal-content').innerHTML = content;

        const style = this.modal.style;

        style.display = 'block';

        document.querySelectorAll('[data-dismiss="modal"]').forEach(e => 
            e.addEventListener('click', () => {
                style.display = 'none';

                document.getElementById('we-modal-title').innerHTML = '';
                document.getElementById('we-modal-content').innerHTML = '';
            })
        );
    }

}
