const core = require('gls-core-service');
const stats = core.Stats.client;
const errors = core.HttpError;
const Abstract = require('./Abstract');

class Transfer extends Abstract {
    async handle({ channelId, method, error, result, _frontendGate }) {
        const time = new Date();

        if (_frontendGate) {
            throw errors.E403.error;
        }

        if (!channelId || !method) {
            throw { code: 400, message: 'Invalid packet routing format.' };
        }

        if (!error && !result) {
            throw { code: 400, message: 'Invalid packet data format.' };
        }

        const response = await this.sendTo('frontend', 'transfer', { channelId, method, error, result });

        stats.timing('transfer_handle', new Date() - time);
        
        if (response.error) {
            throw response.error;
        }

        return response.result;
    }
}

module.exports = Transfer;
