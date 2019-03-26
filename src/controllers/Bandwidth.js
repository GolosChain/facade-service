const core = require('gls-core-service');
const Basic = core.controllers.Basic;

class Bandwidth extends Basic {
    async provideBandwidth({
        routing: { channelId },
        auth: { user },
        params: { transaction, chainId },
    }) {
        return await this.callService('bandwidth', 'bandwidth.provide', {
            routing: { channelId },
            auth: { user },
            params: { transaction, chainId },
        });
    }
}

module.exports = Bandwidth;
