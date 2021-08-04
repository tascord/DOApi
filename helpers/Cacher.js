class Cacher {

    constructor() {
        this.store = {};
    }

    /**
     * Caches an item
     * @param {String} key
     * @param {*} data 
     */
    cache(key, data) {
        this.store[key] = {
            key: key, data: data,
            time: Date.now()
        };
    }

    /**
     * Fetches a value from the cache, or caches one if it doesn't exist
     * @param {Request} request 
     * @returns 
     */
    async fetch(request) {
        const key = request.endpoint;
        if (this.store[key]) return this.store[key];
        else {
            const res = await request.make();
            this.cache(key, res);
            return res;
        }
    }

}

module.exports = new Cacher();