const core = require('gls-core-service');
const Basic = core.controllers.Basic;

class Wallet extends Basic {
    async getBalance({ params: { name, tokensList } }) {
        const data = { name, tokensList };
        return await this.callService('wallet', 'getBalance', data);
    }
    async getHistory({ params: { sender, receiver, sequenceKey, limit } }) {
        const data = { sender, receiver, sequenceKey, limit };
        return await this.callService('wallet', 'getHistory', data);
    }
    async getTokensInfo({ params: tokens }) {
        const data = { tokens };
        return await this.callService('wallet', 'getTokensInfo', data);
    }
    async getVestingInfo({ params: {} }) {
        return await this.callService('wallet', 'getVestingInfo', {});
    }
    async getVestingBalance({ params: { account } }) {
        const data = { account };
        return await this.callService('wallet', 'getVestingBalance', data);
    }
    async getVestingHistory({ params: { account, sequenceKey, limit } }) {
        const data = { account, sequenceKey, limit };
        return await this.callService('wallet', 'getVestingHistory', data);
    }
    async convertVestingToToken({ params: { vesting } }) {
        const data = { vesting };
        return await this.callService('wallet', 'convertVestingToToken', data);
    }
    async convertTokensToVesting({ params: { tokens } }) {
        const data = { tokens };
        return await this.callService('wallet', 'convertTokensToVesting', data);
    }
}

module.exports = Wallet;
