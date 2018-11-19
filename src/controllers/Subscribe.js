const Abstract = require('./Abstract');

class Subscribe extends Abstract {
    async onlineNotifyOn({ user, channelId, requestId }) {
        const time = new Date();
        const data = { user, channelId, requestId };
        const response = await this.sendTo('onlineNotify', 'subscribe', data);

        return await this._handleResponse(response, 'online_notify_on', time);
    }

    async onlineNotifyOff({ user, channelId }) {
        const time = new Date();
        const data = { user, channelId };
        const response = await this.sendTo('onlineNotify', 'unsubscribe', data);

        return await this._handleResponse(response, 'online_notify_off', time);
    }

    async pushNotifyOn({ user, params: { key, profile } }) {
        const time = new Date();
        const data = { user, key, profile };
        const response = await this.sendTo('push', 'subscribe', data);

        return await this._handleResponse(response, 'push_notify_on', time);
    }

    async pushNotifyOff({ user, params: { key, profile } }) {
        const time = new Date();
        const data = { user, key, profile };

        const response = await this.sendTo('push', 'unsubscribe', data);

        return await this._handleResponse(response, 'push_notify_off', time);
    }
}

module.exports = Subscribe;
