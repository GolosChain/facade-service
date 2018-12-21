const core = require('gls-core-service');
const BasicController = core.controllers.Basic;
const stats = core.utils.statsClient;

class Abstract extends BasicController {
    async _handleResponse(response, statsId, time) {
        if (response.error) {
            stats.increment(`${statsId}_error`);

            throw response.error;
        } else {
            stats.timing(statsId, Date.now() - time);

            return response.result;
        }
    }
}

module.exports = Abstract;
