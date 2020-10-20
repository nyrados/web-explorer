import File from "../../file";
import WebExplorer from "../../we";

export default interface App {
    (file: File, we: WebExplorer, event?: any): any
}