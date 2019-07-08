const core = require('gls-core-service');
const Basic = core.controllers.Basic;

class Wallet extends Basic {
    async getBalance({ params: { userId, currencies, type } }) {
        const data = { userId, currencies, type };
        return await this.callService('wallet', 'getBalance', data);
    }
    async getDelegationState({ params: { userId, direction } }) {
        const data = { userId, direction };
        return await this.callService('wallet', 'getDelegationState', data);
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
