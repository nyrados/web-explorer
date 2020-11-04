
export interface ServerResponse
{
    xhr: XMLHttpRequest;
    action: string;
    file: string;
    data: { 
        [key: string]: any
    };
}

export interface ClientError extends ServerResponse
{
    data: {
        error: string;
        message: string;
    }
}

export default class Client {

    private server: string;
    private handler: (error: ClientError) => void;

    private methods: {[key: string]: string} = {
        list: 'GET',
        view: 'GET',
        create_file: 'POST',
        create_dir: 'POST',
        delete: 'POST',
        rename: 'POST',
        copy: 'POST'
    };

    constructor(server: string) {
        this.server = server;
        this.setErrorHandler(error => {
            console.error('Error appeared on request:');
            console.error(error);
        });
    }

    setErrorHandler(callback: (error: ClientError) => void) {
        this.handler = callback;
    }

    request(action: string, file: string, data: Record<string, string> = {}) {
        if (!this.methods[action]) {
            throw new Error('Unsupported action: ' + action);
        }

        data.file = file;

        let url = this.server + '?action=' + action;

        const xhr = new XMLHttpRequest();
        const method = this.methods[action];
        const query = Object.keys(data)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
            .join('&');

        if (method === 'GET') {
            url += '&' + query;
        }

        xhr.open(method, url, true);

        if (method !== 'GET') {
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }

        return new Promise((resolve, reject) => {

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {

                    let result: ServerResponse = {
                        xhr: xhr,
                        action: action,
                        file: file,
                        data: xhr.getResponseHeader('Content-Type') === 'application/json'
                            ? JSON.parse(xhr.responseText)
                            : []
                    };

                    if (xhr.status.toString()[0] === '2') {
                        resolve(result);
                    } else {
                        this.handler(result as ClientError);
                        reject(result);
                    }
                }
            };
    
            if(method === 'GET') {
                xhr.send();
            } else {
                xhr.send(query);
            }
        });
    }

}