const core = require('gls-core-service');
const stats = core.Stats.client;
const Abstract = require('./Abstract');

class Offline extends Abstract {
    async handle({ user, channelId }) {
        const time = new Date();

        try {
            await this.sendTo('onlineNotify', 'unsubscribe', { user, channelId });
        } catch (error) {
            // notify-service offline, do nothing
        }

        stats.timing('offline_handle', new Date() - time);
        return 'Ok';
    }
}

module.exports = Offline;
