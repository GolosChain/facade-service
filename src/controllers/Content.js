const Abstract = require('./Abstract');

class Content extends Abstract {
    async getNaturalFeed({ params: { tags, afterId, limit } }) {
        const time = new Date();
        const data = { tags, afterId, limit };
        const response = await this.sendTo('prism', 'getNaturalFeed', data);

        return await this._handleResponse(response, 'content_feed', time);
    }

    async getPopularFeed({ params: { tags, afterId, limit } }) {
        const time = new Date();
        const data = { tags, afterId, limit };
        const response = await this.sendTo('prism', 'getPopularFeed', data);

        return await this._handleResponse(response, 'content_feed', time);
    }

    async getActualFeed({ params: { tags, afterId, limit } }) {
        const time = new Date();
        const data = { tags, afterId, limit };
        const response = await this.sendTo('prism', 'getActualFeed', data);

        return await this._handleResponse(response, 'content_feed', time);
    }

    async getPromoFeed({ params: { tags, afterId, limit } }) {
        const time = new Date();
        const data = { tags, afterId, limit };
        const response = await this.sendTo('prism', 'getPromoFeed', data);

        return await this._handleResponse(response, 'content_feed', time);
    }

    async getPersonalFeed({ user, params: { tags, afterId, limit } }) {
        const time = new Date();
        const data = { user, tags, afterId, limit };
        const response = await this.sendTo('prism', 'getPersonalFeed', data);

        return await this._handleResponse(response, 'content_feed', time);
    }
}

module.exports = Content;
