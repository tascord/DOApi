module.exports = class Possibly {

    constructor(opts) {

        this.data = opts.data ?? {};
        this.string = opts.string ?? (() => 'Possibly: ' + JSON.stringify(this.data));
        this.orHandler = opts.orHandler ?? (() => {});

    }

    or(...args) {

        // this.orHandler(...args).call(this);
        this.orHandler(...args);

        return this;

    }

    toString() {

        return this.string();

    }

}