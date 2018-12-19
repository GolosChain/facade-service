const Abstract = require('./Abstract');

class Meta extends Abstract {
    async recordPostView({ params: { postLink, fingerPrint } }) {
        return await this._transfer('recordPostView', {
            postLink,
            fingerPrint,
            ip: 'TODO', // TODO: прокинуть из gate
        });
    }

    async getPostsViewCount({ params: { postLinks } }) {
        return await this._transfer('getPostsViewCount', { postLinks });
    }

    async _transfer(method, data) {
        const start = Date.now();
        const response = await this.sendTo('meta', method, data);

        return await this._handleResponse(response, 'meta_execution', start);
    }
}

module.exports = Meta;
