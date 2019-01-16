const core = require('gls-core-service');
const Basic = core.controllers.Basic;
class Subscribe extends Basic {
    async onlineNotifyOn({ user, channelId, requestId }) {
        const data = { user, channelId, requestId };
        return await this.callService('onlineNotify', 'subscribe', data);
    }

    async onlineNotifyOff({ user, channelId }) {
        const data = { user, channelId };
        return await this.callService('onlineNotify', 'unsubscribe', data);
    }

    async pushNotifyOn({ user, params: { key, profile } }) {
        const data = { user, key, profile };
        return await this.callService('push', 'notifyOn', data);
    }

    async pushNotifyOff({ user, params: { key, profile } }) {
        const data = { user, key, profile };
        return await this.callService('push', 'notifyOff', data);
    }
}

module.exports = Subscribe;
