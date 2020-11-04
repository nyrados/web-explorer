import WebExplorer from "../../we";

function createTrInput(we: WebExplorer, after: HTMLElement, complete: (e: HTMLInputElement) => void): void {
    let tr = document.createElement('tr');
        tr.innerHTML = 
            '<td colspan="' + we.settings.rows.length + '">' + 
                '<input type="text" class="form-control" placeholder="Name">'
            '</td>';
    after.parentNode.insertBefore(tr, after.nextSibling);

    let input = tr.querySelector('input');

    input.select();
    input.addEventListener('blur', function () {
        complete(this);
    });
    
    input.addEventListener('keypress', function(e) {
        if(e.which === 13 /* Enter */) {
            this.blur();
        }
    });
}

export default function create(we: WebExplorer) {

    ['file', 'dir'].forEach(type => {
        we.apps.set('we-create-' + type, (we, file, e) => 
            createTrInput(we, (e.target as HTMLElement).parentElement, (input) => {
                

                let create = we.path;
                if (create !== '/') {
                    create += '/';
                }
    
                we.client.request('create_' + type, create + input.value).then(() => we.refresh());
            }
        ));
    });

    we.settings.menu.items.copy = {
        app: 'we-copy',
        text: 'Copy',
        before: 'we-clipboard-clear',
        multiple: true,
        condition: (we, file) => file !== {}
    };

    we.settings.menu.items['create-dir'] = {
        text: 'Create Directory',
        app: 'we-create-dir'
    };
    we.settings.menu.items['create-file'] = {
        text: 'Create File',
        app: 'we-create-file'
    };
};