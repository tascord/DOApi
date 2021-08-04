const $ = require('phin');
const { API_BASE_URL } = require('../constants');

module.exports = class Request {

    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    async make() {
        
        const url = API_BASE_URL + this.endpoint;

        const r = await $({ url, parse: 'json', method: 'POST' }).catch((res) => {
            throw new Error(`[${res.status ?? 'NF'} @ ${url}] ` + (res.message ?? `Unable to contact DOServer`));
        })

        const { body } = r;
        if(!body.success) throw new Error(`[${url}] DOApiError: ${body.message}`);

        return body;

    }

}