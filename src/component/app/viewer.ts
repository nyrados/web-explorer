import File from '../../file';
import WebExplorer from '../../we';
import { ServerResponse } from '../core/client';
import Modal from '../modal';

const modal = new Modal();
const prefix = 'we-viewer-';
const apps: Record<string, (we?: WebExplorer, file?: File) => string> = {
    'audio':   renderAudioHTML,
    'video':   renderVideoHTML,
    'image':   renderImageHTML,
    'default': renderDefaultHTML
}

function renderText(we: WebExplorer, file: File): void {
    we.client.request('view', file.path)
        .then((response: ServerResponse) => 
            modal.open('View: ' + file.name, '<pre>' + response.xhr.responseText + '</pre>')
        );
}

function renderAudioHTML(we: WebExplorer, file: File): string {
    return 
        '<audio controls class="w-100 no-outline">' +
                '<source ' +
                'src="' + we.server + '?action=view&file=' + file.path + '" ' +
                'type="' + file.mime + '"' +
            '>' +
        '</audio>';
}

function renderVideoHTML(we: WebExplorer, file: File): string {
    return 
        '<video controls class="w-100">' +
            '<source ' +
                'src="' + we.server + '?action=view&file=' + file.path + '" ' +
                'type="' + file.mime + '"' +
            '>' +
        '</video>';
}

function renderImageHTML(we: WebExplorer, file: File): string {
    return '<img class="w-100" src="' + we.server + '?action=view&file=' + file.path + '">'
}

function renderDefaultHTML(): string {
    return '<p>No file viewer is integrated!</p>';
}


export default function viewer(we: WebExplorer) {
    for(let key in apps) { 
        we.apps.set(prefix + key, (we, file) => 
            modal.open(file.name, apps[key](we, file))
        );
    }

    we.apps.set(prefix + 'text', renderText);
};