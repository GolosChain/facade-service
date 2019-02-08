const core = require('gls-core-service');
const Basic = core.controllers.Basic;

class Bandwidth extends Basic {
    async provideBandwidth({
        routing: { channelId },
        auth: { user },
        params: { transaction, chainId },
    }) {
        const data = {
            routing: { channelId },
            auth: { user },
            params: { transaction, chainId },
        };

        return await this.callService('bandwidth', 'bandwidth.provide', data);
    }
}

module.exports = Bandwidth;
