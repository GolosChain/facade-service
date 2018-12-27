const Abstract = require('./Abstract');

class Meta extends Abstract {
    async recordPostView({ clientRequestIp, params: { postLink, fingerPrint } }) {
        return await this.callService('meta', 'recordPostView', {
            postLink,
            fingerPrint,
            clientRequestIp,
        });
    }

    async getPostsViewCount({ params: { postLinks } }) {
        return await this.callService('meta', 'getPostsViewCount', { postLinks });
    }

    async markUserOnline({ user }) {
        return await this.callService('meta', 'markUserOnline', { user });
    }

    async getUserLastOnline({ params: { user } }) {
        return await this.callService('meta', 'getUserLastOnline', { user });
    }
}

module.exports = Meta;
