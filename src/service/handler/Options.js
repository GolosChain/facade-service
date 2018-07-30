const R = require('ramda');
const core = require('gls-core-service');
const stats = core.Stats.client;
const logger = core.Logger;

class Options {
    constructor(gate) {
        this._gate = gate;
    }

    async get() {
        // TODO -
    }

    async set() {
        // TODO -
    }
}

module.exports = Options;
