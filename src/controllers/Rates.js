const core = require('gls-core-service');
const Basic = core.controllers.Basic;
class Rates extends Basic {
    async getActual() {
        return await this._transfer('getActual', {});
    }

    async getHistorical({ params: { date } }) {
        return await this._transfer('getHistorical', { date });
    }

    async getHistoricalMulti({ params: { dates } }) {
        return await this._transfer('getHistoricalMulti', { dates });
    }

    async _transfer(method, data) {
        return await this.sendTo('rates', method, data);
    }
}

module.exports = Rates;
