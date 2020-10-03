import WebExplorer from './we';
import settings from './settings';

import DragFile from './component/dragfile';
import Menu from './component/menu';

import viewer from './component/app/viewer';
import create from './component/app/create';
import edit from './component/app/edit';

window.webExplorer = function(id, server) {

    let we = new WebExplorer(id, server, settings);

    //Enable some stuff
    viewer(we);
    create(we);
    edit(we);
    
    //Enable components 
    const drag = new DragFile(we);
    drag.register();

    new Menu(we);

    we.openDir('/');

    return we;
};