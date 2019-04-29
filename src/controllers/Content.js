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
        params: { userId: requestedUserId, permlink, refBlockNum, contentType, username, app },
    }) {
        const data = {
            currentUserId,
            requestedUserId,
            permlink,
            refBlockNum,
            contentType,
            username,
            app,
        };

        return await this.callService('prism', 'getPost', data);
    }

    async getComment({
        auth: { user: currentUserId },
        params: { userId: requestedUserId, permlink, refBlockNum, contentType, username, app },
    }) {
        const data = {
            currentUserId,
            requestedUserId,
            permlink,
            refBlockNum,
            contentType,
            username,
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
        params: { userId: requestedUserId, type, username, app },
    }) {
        const data = { currentUserId, requestedUserId, type, username, app };

        return await this.callService('prism', 'getProfile', data);
    }

    async getHashTagTop({ params: { communityId, limit, sequenceKey } }) {
        const data = { communityId, limit, sequenceKey };

        return await this.callService('prism', 'getHashTagTop', data);
    }

    async getLeadersTop({
        auth: { user: currentUserId },
        params: { communityId, limit, sequenceKey },
    }) {
        const data = { currentUserId, communityId, limit, sequenceKey };

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

        return await this.callService('prism', 'search', data);
    }

    async getPostVotes({ params: { userId: requestedUserId, permlink, refBlockNum } }) {
        const data = { requestedUserId, permlink, refBlockNum };

        return await this.callService('prism', 'getPostVotes', data);
    }

    async getCommentVotes({ params: { userId: requestedUserId, permlink, refBlockNum } }) {
        const data = { requestedUserId, permlink, refBlockNum };

        return await this.callService('prism', 'getCommentVotes', data);
    }

    async resolveProfile({ params: { username, app } }) {
        const data = { username, app };

        return await this.callService('prism', 'resolveProfile', data);
    }

    async getSubscriptions({ params: { userId: requestedUserId, limit, sequenceKey, type } }) {
        const data = { requestedUserId, limit, sequenceKey, type };

        return await this.callService('prism', 'getSubscriptions', data);
    }

    async getSubscribers({ params: { userId: requestedUserId, limit, sequenceKey, type } }) {
        const data = { requestedUserId, limit, sequenceKey, type };

        return await this.callService('prism', 'getSubscribers', data);
    }
}

module.exports = Content;
