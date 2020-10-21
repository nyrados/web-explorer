import { ClientError } from "./core/client";
import Modal from "./modal";

export default function handleModalError(error: ClientError) {
    (new Modal()).open('Error!', 
        '<p>An error occured during <code>' + error.action + '</code> on file <code>' + error.file + '</code>!<p>' + 
        '<p><pre>' + error.data.message + "\n\n" + '<small>(' + error.data.error + ')</small></pre></p>'
    );
};
