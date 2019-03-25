const core = require('gls-core-service');
const Basic = core.controllers.Basic;

class Wallet extends Basic {
    async getBalance({ params: { name } }) {
        return await this.callService('wallet', 'getBalance', { name });
    }
    async getHistory({ params: { query } }) {
        return await this.callService('wallet', 'getHistory', { query });
    }
}

module.exports = Wallet;
