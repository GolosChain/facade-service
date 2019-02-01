const core = require('gls-core-service');
const Basic = core.controllers.Basic;

class Offline extends Basic {
    async handle({ auth: { user }, reouting: { channelId } }) {
        try {
            await this.callService('onlineNotify', 'unsubscribe', { user, channelId });
        } catch (error) {
            // notify-service offline, do nothing
        }

        return 'Ok';
    }
}

module.exports = Offline;
