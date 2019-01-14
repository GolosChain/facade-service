const core = require('gls-core-service');
const Basic = core.controllers.Basic;

class Offline extends Basic {
    async handle({ user, channelId }) {
        try {
            await this.sendTo('onlineNotify', 'unsubscribe', { user, channelId });
        } catch (error) {
            // notify-service offline, do nothing
        }

        return 'Ok';
    }
}

module.exports = Offline;
