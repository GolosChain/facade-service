const core = require('gls-core-service');
const stats = core.Stats.client;
const Abstract = require('./Abstract');

class Subscribe extends Abstract {
    async onlineNotifyOn({ user, channelId, requestId }) {
        const time = new Date();
        const data = { user, channelId, requestId };
        const result = await this.sendTo('onlineNotify', 'subscribe', data);

        stats.timing('online_notify_on', new Date() - time);
        return result;
    }

    async onlineNotifyOff({ user, channelId }) {
        const time = new Date();
        const data = { user, channelId };
        const result = await this.sendTo('onlineNotify', 'unsubscribe', data);

        stats.timing('online_notify_off', new Date() - time);
        return result;
    }

    async pushNotifyOn({ user, params: { key, deviceType } }) {
        const time = new Date();
        const data = { user, key, deviceType };
        const result = await this.sendTo('push', 'subscribe', data);

        stats.timing('push_notify_on', new Date() - time);
        return result;
    }
}

module.exports = Subscribe;
