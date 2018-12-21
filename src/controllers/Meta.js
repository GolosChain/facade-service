const Abstract = require('./Abstract');

class Meta extends Abstract {
    async recordPostView({ clientRequestIp, params: { postLink, fingerPrint } }) {
        const response = await this.sendTo('meta', 'recordPostView', {
            postLink,
            fingerPrint,
            clientRequestIp,
        });

        if (response.error) {
            throw response.error;
        }

        return response.result;
    }

    async getPostsViewCount({ params: { postLinks } }) {
        const response = await this.sendTo('meta', 'getPostsViewCount', { postLinks });

        if (response.error) {
            throw response.error;
        }

        return response.result;
    }
}

module.exports = Meta;
