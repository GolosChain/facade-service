const Abstract = require('./Abstract');

class Rates extends Abstract {
    async getActual({ params }) {
        return await this._transfer('getActual', params);
    }

    async getHistorical({ params }) {
        return await this._transfer('getHistorical', params);
    }

    async getHistoricalMulti({ params }) {
        return await this._transfer('getHistoricalMulti', params);
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
