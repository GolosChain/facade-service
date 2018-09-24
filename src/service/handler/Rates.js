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
        const response = await this.sendTo('rates', method, data);

        if (response.error) {
            throw response.error;
        } else {
            return response.result;
        }
    }
}

module.exports = Rates;
