const Abstract = require('./Abstract');

class Content extends Abstract {
    async getFeed({ user, params: { type, tags, fromId, limit } }) {
        const time = new Date();
        const data = { user, type, tags, fromId, limit };
        const response = await this.sendTo('prism', 'getFeed', data);

        return await this._handleResponse(response, 'content_feed', time);
    }
}

module.exports = Content;
