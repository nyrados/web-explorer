import File from "../../file";
import WebExplorer from "../../we";
import FileClipboard from "../clipboard";

export default function edit(we: WebExplorer) {

    const clipboard = new FileClipboard();
    
    we.apps.set('we-delete', (we: WebExplorer, file: File) => {
        we.client.request('delete', file.path).then(() => we.refresh());
    });

    we.apps.set('we-download', (we: WebExplorer, file: File) =>
        window.location.href = we.server + '?action=download&file=' + file.path
    );

    we.apps.set('we-clipboard-clear', () => clipboard.clear());
    we.apps.set('we-copy', (we, file) => clipboard.copy(file));
    we.apps.set('we-cut', (we, file) => clipboard.cut(file));

    we.apps.set('we-paste', we => {

        const mode = clipboard.isCut ? 'rename' : 'copy';
        let path = we.path;
        if (we.path !== '/') {
            path = path + '/';
        }

        clipboard.clipboard.forEach(item => {
            we.client.request(mode, item.path, {to: path + item.name}).then(() => we.refresh());
        });
    });

    we.settings.menu.items.copy = {
        app: 'we-copy',
        text: 'Copy',
        before: 'we-clipboard-clear',
        multiple: true,
        condition: (we: WebExplorer, file?: File) => !!file
    };

    we.settings.menu.items.delete = {
        text: 'Delete',
        app: 'we-delete',
        multiple: true,
        condition: (we: WebExplorer, file?: File) => !!file
    };

    we.settings.menu.items.cut = {
        text: 'Cut',
        app: 'we-cut',
        before: 'we-clipboard-clear',
        multiple: true,
        condition: (we: WebExplorer, file?: File) => !!file
    };

    we.settings.menu.items.paste = {
        text: 'Paste',
        app: 'we-paste',
        condition: we => !clipboard.isEmpty()
    };
};