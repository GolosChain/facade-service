const core = require('gls-core-service');
const Basic = core.controllers.Basic;

class Wallet extends Basic {
    async getBalance({ params: { name, tokensList } }) {
        return await this.callService('wallet', 'getBalance', { name, tokensList });
    }
    async getHistory({ params: { query } }) {
        return await this.callService('wallet', 'getHistory', { query });
    }
    async getTokensInfo({ params: args }) {
        return await this.callService('wallet', 'getHistory', args);
    }
    async getVestingInfo({ params: {} }) {
        return await this.callService('wallet', 'getHistory', {});
    }
    async getVestingBalance({ params: { account } }) {
        return await this.callService('wallet', 'getVestingBalance', { account });
    }
    async getVestingHistory({ params: args }) {
        return await this.callService('wallet', 'getVestingHistory', args);
    }
}

module.exports = Wallet;
