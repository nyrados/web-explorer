import File from '../../file';
import WebExplorer from '../../we';
import { ServerResponse } from '../core/client';
import Modal from '../modal';

const modal = new Modal();

export default function viewer(we: WebExplorer) {

    we.apps.set('we-viewer-audio', (we, file) => modal.open(file.name, 
        '<audio controls class="w-100 no-outline">' +
            '<source ' +
                'src="' + we.server + '?action=view&file=' + file.path + '" ' +
                'type="' + file.mime + '"' +
            '>' +
        '</audio>'
    ));

    we.apps.set('we-viewer-image', (we, file) => modal.open(file.name, 
        '<img class="w-100" src="' + we.server + '?action=view&file=' + file.path + '">'
    ));

    we.apps.set('we-viewer-video', (we, file) => modal.open(file.name, 
        '<video controls class="w-100">' +
            '<source ' +
                'src="' + we.server + '?action=view&file=' + file.path + '" ' +
                'type="' + file.mime + '"' +
            '>' +
        '</video>'
    ));

    we.apps.set('we-viewer-default', (we, file) => modal.open(file.name, 
        '<p>No file viewer is integrated!</p>'
    ));

    we.apps.set('we-viewer-text', (we, file) => we.client.request('view', file.path)
        .then((response: ServerResponse) => 
            modal.open('View: ' + file.name, '<pre>' + response.xhr.responseText + '</pre>')
        )
    );

};