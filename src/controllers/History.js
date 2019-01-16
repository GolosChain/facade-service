const core = require('gls-core-service');
const Basic = core.controllers.Basic;
class History extends Basic {
    async notify({ user, params: { fromId, limit, types, markAsViewed = true, freshOnly } }) {
        const data = { user, fromId, limit, types, markAsViewed, freshOnly };
        return await this.callService('notify', 'history', data);
    }

    async notifyFresh({ user }) {
        return await this.callService('notify', 'historyFresh', { user });
    }

    async onlineNotify({ user, params: { fromId, limit, markAsViewed = true, freshOnly } }) {
        const data = { user, fromId, limit, markAsViewed, freshOnly };
        return await this.callService('onlineNotify', 'history', data);
    }

    async onlineNotifyFresh({ user }) {
        return await this.callService('onlineNotify', 'historyFresh', { user });
    }

    async push({
        user,
        params: { profile, afterId, limit, types, markAsViewed = true, freshOnly },
    }) {
        const data = { user, profile, afterId, limit, types, markAsViewed, freshOnly };
        return await this.callService('push', 'history', data);
    }

    async pushFresh({ user, params: { profile } }) {
        return await this.callService('push', 'historyFresh', { user, profile });
    }

    async markAsViewed({ user, params: { ids } }) {
        return await this.callService('notify', 'markAsViewed', { user, ids });
    }

    async markAllAsViewed({ user }) {
        return await this.callService('notify', 'markAllAsViewed', { user });
    }
}

module.exports = History;
