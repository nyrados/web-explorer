import WebExplorer from "./we";
import Viewer from "./app/viewer";
import Edit from "./app/edit";
import Create from "./app/create";
import DragFile from "./dragfile";
import Menu from "./menu";
import { settings } from "./settings/settings";


window.webExplorer = (id, server) => {

    const we = new WebExplorer(id, server);

    we.setSettings(settings);

    //Register Apps
    Viewer(we);
    Edit(we);
    Create(we);
    DragFile(we);
    new Menu(we);

    
    we.openDir('/');


    return we;
};
