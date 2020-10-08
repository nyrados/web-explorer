
import Viewer from './app/viewer';
import Menu from './menu';
import Create from './app/create';
import Edit from './app/edit';
import DragFile from './dragfile';
import WebExplorer from './we';


const we = function(id: string, server: string): WebExplorer {

    let we = new WebExplorer(id, server);
    
    //Enable Context Menu
    new Menu(we);

    //Enable other stuff
    Viewer(we);
    Create(we);
    Edit(we);
    DragFile(we);

    we.openDir('/');

    return we;
};