const core = require('gls-core-service');
const Basic = core.controllers.Basic;

class Offline extends Basic {
    async handle({ auth: { user }, routing: { channelId } }) {
        try {
            const data = { user, channelId };

            await this.callService('onlineNotify', 'unsubscribe', data);
            await this.callService('bandwidth', 'bandwidth.notifyOffline', data);
        } catch (error) {
            // notify-service offline, do nothing
        }

        return 'Ok';
    }
}

module.exports = Offline;
