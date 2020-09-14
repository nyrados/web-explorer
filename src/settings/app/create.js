
function createTrInput(after, complete) {
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

export default function Create(we) {
    
    ['file', 'dir'].forEach(type => {

        we.apps.set('we-create-' + type, (we, file, e) => createTrInput(e.target, (input) => {
            let create = we.path;
            if (create !== '/') {
                create += '/';
            }
    
            we.client.request('create_' + type, create + input.value).then(() => we.refresh());
        }));

    });

};