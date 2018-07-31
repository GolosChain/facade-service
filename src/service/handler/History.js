const core = require('gls-core-service');
const stats = core.Stats.client;
const Abstract = require('./Abstract');

class History extends Abstract {
    async notify({ user, params: { skip, limit, types } }) {
        const time = new Date();
        const data = { user, skip, limit, types };
        const result = await this.sendTo('notifyRegistrator', 'history', data);

        stats.timing('notify_history', new Date() - time);
        return result;
    }
}

module.exports = History;
