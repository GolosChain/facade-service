const core = require('gls-core-service');
const stats = core.Stats.client;

class History {
    constructor(gate) {
        this._gate = gate;
    }

    async notify({ user, params: { skip, limit, types } }) {
        const time = new Date();
        const result = await this._gate.sendTo('notifyRegistrator', 'history', { user, skip, limit, types });

        stats.timing('notify_history', new Date() - time);
        return result;
    }
}

module.exports = History;
