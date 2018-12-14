const Abstract = require('./Abstract');

class History extends Abstract {
    async notify({ user, params: { fromId, limit, types, markAsViewed = true, freshOnly } }) {
        const time = new Date();
        const data = { user, fromId, limit, types, markAsViewed, freshOnly };
        const response = await this.sendTo('notify', 'history', data);

        return await this._handleResponse(response, 'get_history', time);
    }

    async notifyFresh({ user }) {
        const time = new Date();
        const response = await this.sendTo('notify', 'historyFresh', { user });

        return await this._handleResponse(response, 'get_history', time);
    }

    async onlineNotify({ user, params: { fromId, limit, markAsViewed = true, freshOnly } }) {
        const time = new Date();
        const data = { user, fromId, limit, markAsViewed, freshOnly };
        const response = await this.sendTo('onlineNotify', 'history', data);

        return await this._handleResponse(response, 'get_history', time);
    }

    async onlineNotifyFresh({ user }) {
        const time = new Date();
        const response = await this.sendTo('onlineNotify', 'historyFresh', { user });

        return await this._handleResponse(response, 'get_history', time);
    }

    async push({ user, params: { afterId, limit, markAsViewed = true, freshOnly } }) {
        const time = new Date();
        const data = { user, afterId, limit, markAsViewed, freshOnly };
        const response = await this.sendTo('push', 'history', data);

        return await this._handleResponse(response, 'get_history', time);
    }

    async pushFresh({ user }) {
        const time = new Date();
        const response = await this.sendTo('push', 'historyFresh', { user });

        return await this._handleResponse(response, 'get_history', time);
    }

    async markAsViewed({ user, params: { ids } }) {
        const time = new Date();
        const response = await this.sendTo('notify', 'markAsViewed', { user, ids });

        return await this._handleResponse(response, 'get_history', time);
    }

    async markAllAsViewed({ user }) {
        const time = new Date();
        const response = await this.sendTo('notify', 'markAllAsViewed', { user });

        return await this._handleResponse(response, 'get_history', time);
    }
}

module.exports = History;
