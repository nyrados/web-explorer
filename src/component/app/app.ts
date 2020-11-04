import File from "../../file";
import WebExplorer from "../../we";

export default interface App {
    (we: WebExplorer, file?: File, event?: any): any
}