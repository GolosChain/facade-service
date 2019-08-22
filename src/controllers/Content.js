const core = require('gls-core-service');
const Basic = core.controllers.Basic;

class Content extends Basic {
    async getComments({
        auth: { user: currentUserId },
        params: {
            sortBy,
            sequenceKey,
            limit,
            userId: requestedUserId,
            user,
            permlink,
            refBlockNum,
            type,
            contentType,
        },
    }) {
        const data = {
            sortBy,
            sequenceKey,
            limit,
            requestedUserId,
            user,
            currentUserId,
            permlink,
            refBlockNum,
            type,
            contentType,
        };

        return await this.callService('prism', 'getComments', data);
    }

    async getPost({
        auth: { user: currentUserId },
        params: {
            userId: requestedUserId,
            permlink,
            refBlockNum,
            contentType,
            username,
            user,
            app,
        },
    }) {
        const data = {
            currentUserId,
            requestedUserId,
            permlink,
            refBlockNum,
            contentType,
            username,
            user,
            app,
        };

        return await this.callService('prism', 'getPost', data);
    }

    async getComment({
        auth: { user: currentUserId },
        params: {
            userId: requestedUserId,
            permlink,
            refBlockNum,
            contentType,
            username,
            user,
            app,
        },
    }) {
        const data = {
            currentUserId,
            requestedUserId,
            permlink,
            refBlockNum,
            contentType,
            username,
            user,
            app,
        };

        return await this.callService('prism', 'getComment', data);
    }

    async getFeed({
        auth: { user: currentUserId },
        params: {
            type,
            sortBy,
            sequenceKey,
            limit,
            userId: requestedUserId,
            communityId,
            timeframe,
            tags,
            contentType,
            username,
            app,
        },
    }) {
        const data = {
            type,
            sortBy,
            sequenceKey,
            limit,
            currentUserId,
            requestedUserId,
            communityId,
            timeframe,
            tags,
            contentType,
            username,
            app,
        };

        return await this.callService('prism', 'getFeed', data);
    }

    async getProfile({
        auth: { user: currentUserId },
        params: { userId: requestedUserId, type, username, user, app },
    }) {
        const data = { currentUserId, requestedUserId, type, username, user, app };

        return await this.callService('prism', 'getProfile', data);
    }

    async suggestNames({ params }) {
        return await this.callService('prism', 'suggestNames', params);
    }

    async getChargers({ params: { userId } }) {
        const data = { userId };

        return await this.callService('prism', 'getChargers', data);
    }

    async getHashTagTop({ params: { communityId, limit, sequenceKey } }) {
        const data = { communityId, limit, sequenceKey };

        return await this.callService('prism', 'getHashTagTop', data);
    }

    async getLeadersTop({
        auth: { user: currentUserId },
        params: { communityId, limit, sequenceKey, app },
    }) {
        const data = { currentUserId, communityId, limit, sequenceKey, app };

        return await this.callService('prism', 'getLeadersTop', data);
    }

    async waitForBlock({ params: { blockNum } }) {
        const data = { blockNum };

        return await this.callService('prism', 'waitForBlock', data);
    }

    async waitForTransaction({ params: { transactionId } }) {
        const data = { transactionId };

        return await this.callService('prism', 'waitForTransaction', data);
    }

    async search({ params: { where, text, field, limit, offset, type } }) {
        const data = { where, text, field, limit, offset, type };

        return await this.callService('search', 'search', data);
    }

    async getPostVotes({
        params: { userId: requestedUserId, permlink, type, sequenceKey, limit, app },
        auth,
    }) {
        const data = {
            requestedUserId,
            permlink,
            type,
            sequenceKey,
            limit,
            app,
        };

        if (auth && auth.user) {
            data.currentUserId = auth.user;
        }

        return await this.callService('prism', 'getPostVotes', data);
    }

    async getCommentVotes({
        params: { userId: requestedUserId, permlink, type, sequenceKey, limit, app },
        auth,
    }) {
        const data = {
            requestedUserId,
            permlink,
            type,
            sequenceKey,
            limit,
            app,
        };

        if (auth && auth.user) {
            data.currentUserId = auth.user;
        }

        return await this.callService('prism', 'getCommentVotes', data);
    }

    async resolveProfile({ params: { username, app } }) {
        const data = { username, app };

        return await this.callService('prism', 'resolveProfile', data);
    }

    async getSubscriptions({
        auth: { user: currentUserId },
        params: { userId: requestedUserId, limit, sequenceKey, type },
    }) {
        const data = { currentUserId, requestedUserId, limit, sequenceKey, type };

        return await this.callService('prism', 'getSubscriptions', data);
    }

    async getSubscribers({
        auth: { user: currentUserId },
        params: { userId: requestedUserId, limit, sequenceKey, type },
    }) {
        const data = { currentUserId, requestedUserId, limit, sequenceKey, type };

        return await this.callService('prism', 'getSubscribers', data);
    }

    async getProposals({ params: { communityId, limit, sequenceKey, app } }) {
        const data = { communityId, limit, sequenceKey, app };

        return await this.callService('prism', 'getProposals', data);
    }

    async getHeaders({ params }) {
        return await this.callService('prism', 'getHeaders', params);
    }

    async getNotifyMeta({ params }) {
        return await this.callService('prism', 'getNotifyMeta', params);
    }

    async getCommunitySettings({ params }) {
        return await this.callService('prism', 'getCommunitySettings', params);
    }

    async findLeaders({ auth: { user: currentUserId }, params }) {
        return await this.callService('prims', 'findLeaders', {...params, currentUserId});
    }
}

module.exports = Content;
