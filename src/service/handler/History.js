const Abstract = require('./Abstract');

class History extends Abstract {
    async notify({ user, params: { fromId, limit, types, markAsViewed } }) {
        const time = new Date();
        const data = { user, fromId, limit, types, markAsViewed };
        const response = await this.sendTo('notify', 'history', data);

        return await this._handleResponse(response, 'notify_history', time);
    }

    async notifyFresh({ user }) {
        const time = new Date();
        const response = await this.sendTo('notify', 'historyFresh', { user });

        return await this._handleResponse(response, 'notify_history_fresh', time);
    }

    async markAsViewed({ user, params: { ids } }) {
        const time = new Date();
        const response = await this.sendTo('notify', 'markAsViewed', { user, ids });

        return await this._handleResponse(response, 'notify_mark_viewed', time);
    }

    async markAllAsViewed({ user }) {
        const time = new Date();
        const response = await this.sendTo('notify', 'markAllAsViewed', { user });

        return await this._handleResponse(response, 'notify_mark_all_viewed', time);
    }
}

module.exports = History;
