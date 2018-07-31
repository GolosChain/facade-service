const core = require('gls-core-service');
const stats = core.Stats.client;

class Transfer {
    constructor(gate) {
        this._gate = gate;
    }

    async do(data) {
        const time = new Date();

        await this._gate.sendTo('frontend', 'transfer', data);

        stats.timing('transfer', new Date() - time);
        return 'Ok';
    }
}

module.exports = Transfer;
