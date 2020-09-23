
import Viewer from './app/viewer';
import Menu from './menu';
import Create from './app/create';
import Edit from './app/edit';
import DragFile from './dragfile';
import WebExplorer from './we';


window.webExplorer = function(id, server) {

    let we = new WebExplorer(id, server);
    
    //Enable Context Menu
    new Menu(we);

    //Enable some apps
    Viewer(we);
    Create(we);
    Edit(we);
    DragFile(we);

    we.openDir('/');


    return we;
};