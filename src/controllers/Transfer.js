const core = require('gls-core-service');
const Basic = core.controllers.Basic;
class Transfer extends Basic {
    async handle({ channelId, method, error, result, _frontendGate }) {
        if (_frontendGate) {
            throw { code: 403, message: 'Access denied.' };
        }

        if (!channelId || !method) {
            throw { code: 400, message: 'Invalid packet routing format.' };
        }

        if (!error && !result) {
            throw { code: 400, message: 'Invalid packet data format.' };
        }

        const response = await this.callService('frontend', 'transfer', {
            channelId,
            method,
            error,
            result,
        });

        if (response.error) {
            throw response.error;
        }

        return response.result;
    }
}

module.exports = Transfer;
