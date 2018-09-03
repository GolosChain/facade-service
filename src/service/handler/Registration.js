const core = require('gls-core-service');
const stats = core.Stats.client;
const Abstract = require('./Abstract');

class Registration extends Abstract {
    async getState({ params }) {
        return await this._transfer('getState', params);
    }

    async firstStep({ params }) {
        return await this._transfer('firstStep', params);
    }

    async verify({ params }) {
        return await this._transfer('verify', params);
    }

    async toBlockChain({ params }) {
        return await this._transfer('toBlockChain', params);
    }

    async changePhone({ params }) {
        return await this._transfer('changePhone', params);
    }

    async resendSmsCode({ params }) {
        return await this._transfer('resendSmsCode', params);
    }

    async subscribeOnSmsGet({ channelId, params }) {
        return await this._transfer('subscribeOnSmsGet', { channelId, ...params });
    }

    async _transfer(method, data) {
        const response = await this.sendTo('registration', method, data);

        if (response.error) {
            throw response.error;
        } else {
            return response.result;
        }
    }
}

module.exports = Registration;
