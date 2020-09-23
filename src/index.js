
import Viewer from './settings/app/viewer';
import Menu from './menu';
import Create from './settings/app/create';
import Edit from './settings/app/edit';
import DragFile from './dragfile';
import WebExplorer from './we';


window.webExplorer = function(id, server) {

    let we = new WebExplorer(id, server);

    //Enable some apps
    Viewer(we);
    Create(we);
    Edit(we);
    DragFile(we);

    //Enable Context Menu
    new Menu(we);

    we.openDir('/');


    return we;
};