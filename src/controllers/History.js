const core = require('gls-core-service');
const Basic = core.controllers.Basic;
class History extends Basic {
    async notify({ user, params: { fromId, limit, types, markAsViewed = true, freshOnly } }) {
        const data = { user, fromId, limit, types, markAsViewed, freshOnly };
        return await this.sendTo('notify', 'history', data);
    }

    async notifyFresh({ user }) {
        return await this.sendTo('notify', 'historyFresh', { user });
    }

    async onlineNotify({ user, params: { fromId, limit, markAsViewed = true, freshOnly } }) {
        const data = { user, fromId, limit, markAsViewed, freshOnly };
        return await this.sendTo('onlineNotify', 'history', data);
    }

    async onlineNotifyFresh({ user }) {
        return await this.sendTo('onlineNotify', 'historyFresh', { user });
    }

    async push({
        user,
        params: { profile, afterId, limit, types, markAsViewed = true, freshOnly },
    }) {
        const data = { user, profile, afterId, limit, types, markAsViewed, freshOnly };
        return await this.sendTo('push', 'history', data);
    }

    async pushFresh({ user, params: { profile } }) {
        return await this.sendTo('push', 'historyFresh', { user, profile });
    }

    async markAsViewed({ user, params: { ids } }) {
        return await this.sendTo('notify', 'markAsViewed', { user, ids });
    }

    async markAllAsViewed({ user }) {
        return await this.sendTo('notify', 'markAllAsViewed', { user });
    }
}

module.exports = History;
