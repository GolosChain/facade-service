const core = require('gls-core-service');
const stats = core.Stats.client;
const Abstract = require('./Abstract');

class Registration extends Abstract {
    async firstStep(data) {
        return await this.transfer('firstStep', data);
    }

    async verify(data) {
        return await this.transfer('verify', data);
    }

    async toBlockChain(data) {
        return await this.transfer('toBlockChain', data);
    }

    async changePhone(data) {
        return await this.transfer('changePhone', data);
    }

    async resendSmsCode(data) {
        return await this.transfer('resendSmsCode', data);
    }

    async subscribeOnSmsGet(data) {
        return await this.transfer('subscribeOnSmsGet', data);
    }

    async transfer(method, { params }) {
        const response = await this.sendTo('registration', method, params);

        if (response.error) {
            throw response.error;
        } else {
            return response.result;
        }
    }
}

module.exports = Registration;
