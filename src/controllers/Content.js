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
            userId,
            permlink,
            refBlockNum,
            type,
        },
    }) {
        const data = {
            sortBy,
            sequenceKey,
            limit,
            requestedUserId,
            currentUserId,
            userId,
            permlink,
            refBlockNum,
            type,
        };

        return await this.callService('prism', 'getComments', data);
    }

    async getPost({ auth: { user: currentUserId }, params: { userId, permlink, refBlockNum } }) {
        const data = { currentUserId, userId, permlink, refBlockNum };

        return await this.callService('prism', 'getPost', data);
    }

    async getFeed({
        auth: { user: currentUserId },
        params: { type, sortBy, sequenceKey, limit, userId: requestedUserId, communityId },
    }) {
        const data = {
            type,
            sortBy,
            sequenceKey,
            limit,
            currentUserId,
            requestedUserId,
            communityId,
        };

        return await this.callService('prism', 'getFeed', data);
    }

    async getProfile({ params: { userId: requestedUserId } }) {
        const data = { requestedUserId };

        return await this.callService('prism', 'getProfile', data);
    }
}

module.exports = Content;
