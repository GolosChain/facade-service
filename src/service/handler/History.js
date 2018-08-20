const core = require('gls-core-service');
const stats = core.Stats.client;
const Abstract = require('./Abstract');

class History extends Abstract {
    async notify({ user, params: { fromId, limit, types } }) {
        const time = new Date();
        const data = { user, fromId, limit, types };
        const response = await this.sendTo('notify', 'history', data);

        if (response.error) {
            stats.increment('notify_history_error');
            throw response.error;
        } else {
            stats.timing('notify_history', new Date() - time);
            return response.result;
        }
    }

    async notifyFresh({ user }) {
        const time = new Date();
        const response = await this.sendTo('notify', 'historyFresh', { user });

        if (response.error) {
            stats.increment('notify_history_fresh_error');
            throw response.error;
        } else {
            stats.timing('notify_history_fresh', new Date() - time);
            return response.result;
        }
    }
}

module.exports = History;
