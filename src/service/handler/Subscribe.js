const R = require('ramda');
const core = require('gls-core-service');
const stats = core.Stats.client;
const logger = core.Logger;

class Subscribe {
    constructor(gate) {
        this._gate = gate;
    }

    async onlineNotifyOn() {
        // TODO -
    }

    async onlineNotifyOff() {
        // TODO -
    }

    async pushNotifyOn() {
        // TODO -
    }
}

module.exports = Subscribe;
