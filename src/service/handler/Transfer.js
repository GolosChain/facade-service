const core = require('gls-core-service');
const stats = core.Stats.client;
const errors = core.HttpError;
const Abstract = require('./Abstract');

class Transfer extends Abstract {
    async handle({ channelId, requestId, error, result, _frontendGate }) {
        const time = new Date();

        if (_frontendGate) {
            throw errors.E403.error;
        }

        if (!channelId || !requestId) {
            throw { code: 400, message: 'Invalid packet routing format.' };
        }

        if (!error && !result) {
            throw { code: 400, message: 'Invalid packet data format.' };
        }

        await this.sendTo('frontend', 'transfer', { channelId, requestId, error, result });

        stats.timing('transfer_handle', new Date() - time);
        return 'Ok';
    }
}

module.exports = Transfer;
