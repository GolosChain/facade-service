const core = require('gls-core-service');
const stats = core.Stats.client;

class Transfer {
    constructor(gate) {
        this._gate = gate;
    }

    async do(data) {
        const time = new Date();
        const { channelId, requestId, error, result } = data;

        if (!channelId || !requestId) {
            throw { code: 400, message: 'Invalid packet routing format.' };
        }

        if (!error && !result) {
            throw { code: 400, message: 'Invalid packet data format.' };
        }

        await this._gate.sendTo('frontend', 'transfer', data);

        stats.timing('transfer', new Date() - time);
        return 'Ok';
    }
}

module.exports = Transfer;
