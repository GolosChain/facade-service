const Abstract = require('./Abstract');

class Rates extends Abstract {
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
        const time = new Date();
        const response = await this.sendTo('rates', method, data);

        return await this._handleResponse(response, 'rates_execution', time);
    }
}

module.exports = Rates;
