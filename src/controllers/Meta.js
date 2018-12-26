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
        return await this.callService('meta', 'markUserOnline', {
            username: user,
        });
    }

    async getUsersLastOnline({ params: { usernames } }) {
        return await this.callService('meta', 'getUsersLastOnline', { usernames });
    }
}

module.exports = Meta;
