const core = require('gls-core-service');
const Basic = core.controllers.Basic;

class Content extends Basic {
    async getNaturalFeed({ params: { tags, afterId, limit } }) {
        const data = { tags, afterId, limit };
        return await this.sendTo('prism', 'getNaturalFeed', data);
    }

    async getPopularFeed({ params: { tags, afterId, limit } }) {
        const data = { tags, afterId, limit };
        return await this.sendTo('prism', 'getPopularFeed', data);
    }

    async getActualFeed({ params: { tags, afterId, limit } }) {
        const data = { tags, afterId, limit };
        return await this.sendTo('prism', 'getActualFeed', data);
    }

    async getPromoFeed({ params: { tags, afterId, limit } }) {
        const data = { tags, afterId, limit };
        return await this.sendTo('prism', 'getPromoFeed', data);
    }

    async getPersonalFeed({ user, params: { tags, afterId, limit } }) {
        const data = { user, tags, afterId, limit };
        return await this.sendTo('prism', 'getPersonalFeed', data);
    }
}

module.exports = Content;
