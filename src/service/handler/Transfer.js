const core = require('gls-core-service');
const stats = core.Stats.client;
const Abstract = require('./Abstract');

class Transfer extends Abstract {
    async do(data) {
        const time = new Date();
        const { channelId, requestId, error, result } = data;

        if (!channelId || !requestId) {
            throw { code: 400, message: 'Invalid packet routing format.' };
        }

        if (!error && !result) {
            throw { code: 400, message: 'Invalid packet data format.' };
        }

        await this.sendTo('frontend', 'transfer', data);

        stats.timing('transfer', new Date() - time);
        return 'Ok';
    }
}

module.exports = Transfer;
