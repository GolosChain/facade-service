const core = require('gls-core-service');
const stats = core.Stats.client;
const Abstract = require('./Abstract');

class Registration extends Abstract {
    async firstStep({ params }) {
        return await this.transfer('firstStep', params);
    }

    async verify({ params }) {
        return await this.transfer('verify', params);
    }

    async toBlockChain({ params }) {
        return await this.transfer('toBlockChain', params);
    }

    async changePhone({ params }) {
        return await this.transfer('changePhone', params);
    }

    async resendSmsCode({ params }) {
        return await this.transfer('resendSmsCode', params);
    }

    async subscribeOnSmsGet({ channelId, params }) {
        return await this.transfer('subscribeOnSmsGet', { channelId, ...params });
    }

    async transfer(method, data) {
        const response = await this.sendTo('registration', method, data);

        if (response.error) {
            throw response.error;
        } else {
            return response.result;
        }
    }
}

module.exports = Registration;
