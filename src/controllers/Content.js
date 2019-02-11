const core = require('gls-core-service');
const Basic = core.controllers.Basic;

class Content extends Basic {
    async getComments({ params: { sortBy, sequenceKey, limit, userId, postId, type } }) {
        const data = { sortBy, sequenceKey, limit, userId, postId, type };

        return await this.callService('prism', 'getComments', data);
    }

    async getPost({ params: { postId, userId } }) {
        const data = { postId, userId };

        return await this.callService('prism', 'getPost', data);
    }

    async getFeed({ params: { type, sortBy, sequenceKey, limit, userId, communityId } }) {
        const data = { type, sortBy, sequenceKey, limit, userId, communityId };

        return await this.callService('prism', 'getFeed', data);
    }

    async getProfile({ params: { id } }) {
        const data = { id };

        return await this.callService('prism', 'getProfile', data);
    }
}

module.exports = Content;
