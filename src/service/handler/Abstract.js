const core = require('gls-core-service');
const stats = core.statsClient;

class Abstract {
    constructor(gate) {
        this._gate = gate;
    }

    async sendTo(...args) {
        return await this._gate.sendTo(...args);
    }

    async _handleResponse(response, statsId, time) {
        if (response.error) {
            stats.increment(`${statsId}_error`);
            throw response.error;
        } else {
            stats.timing(statsId, new Date() - time);
            return response.result;
        }
    }
}

module.exports = Abstract;
