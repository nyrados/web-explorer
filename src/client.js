export default class Client {

    methods = {
        list: 'GET',
        view: 'GET',
        create_file: 'GET',
        create_dir: 'GET',
        delete: 'GET',
        rename: 'GET',
        copy: 'GET'
    }

    constructor(server) {
        this.server = server;
    }

    request(action, file, data = {}) {
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
        } else {
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }

        xhr.open(method, url, true);

        return new Promise(function(resolve, reject) {

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {

                    let result = {
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