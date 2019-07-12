const core = require('gls-core-service');
const Basic = core.controllers.Basic;

class Wallet extends Basic {
    async getBalance({ params }) {
        return await this.callService('wallet', 'getBalance', params);
    }
    
    async getDelegationState({ params }) {
        return await this.callService('wallet', 'getDelegationState', params);
    }
    
    async getTransferHistory({ params }) {
        return await this.callService('wallet', 'getTransferHistory', params);
    }
    
    async getRewardsHistory({ params }) {
        return await this.callService('wallet', 'getRewardsHistory', params);
    }
    
    async getVestingHistory({ params }) {
        return await this.callService('wallet', 'getVestingHistory', params);
    }
    
    async getTokensInfo({ params }) {
        return await this.callService('wallet', 'getTokensInfo', params);
    }
    
    async getVestingInfo({ params }) {
        return await this.callService('wallet', 'getVestingInfo', params);
    }
    
    async convertVestingToToken({ params }) {
        return await this.callService('wallet', 'convertVestingToToken', params);
    }
    
    async convertTokensToVesting({ params }) {
        return await this.callService('wallet', 'convertTokensToVesting', params);
    }
}

module.exports = Wallet;
