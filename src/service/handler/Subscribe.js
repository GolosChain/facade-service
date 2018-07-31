const core = require('gls-core-service');
const stats = core.Stats.client;

class Subscribe {
    constructor(gate) {
        this._gate = gate;
    }

    async onlineNotifyOn({ user, channelId, requestId }) {
        const time = new Date();
        const result = await this._gate.sendTo('notifyOnline', 'subscribe', { user, channelId, requestId });

        stats.timing('online_notify_on', new Date() - time);
        return result;
    }

    async onlineNotifyOff({ user, channelId }) {
        const time = new Date();
        const result = await this._gate.sendTo('notifyOnline', 'unsubscribe', { user, channelId });

        stats.timing('online_notify_off', new Date() - time);
        return result;
    }

    async pushNotifyOn({ user, params: { key, deviceType } }) {
        const time = new Date();
        const result = await this._gate.sendTo('push', 'subscribe', { user, key, deviceType });

        stats.timing('push_notify_on', new Date() - time);
        return result;
    }
}

module.exports = Subscribe;
