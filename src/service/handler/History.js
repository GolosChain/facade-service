const core = require('gls-core-service');
const stats = core.Stats.client;
const Abstract = require('./Abstract');

class History extends Abstract {
    async notify({ user, params: { fromId, limit, types } }) {
        const time = new Date();
        const data = { user, fromId, limit, types };
        const response = await this.sendTo('notify', 'history', data);

        stats.timing('notify_history', new Date() - time);
        return response.result;
    }
}

module.exports = History;
