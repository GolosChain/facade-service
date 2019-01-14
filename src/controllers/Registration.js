const core = require('gls-core-service');
const Basic = core.controllers.Basic;
class Registration extends Basic {
    async getState({ params: { user } }) {
        return await this._transfer('getState', { user });
    }

    async firstStep({ params: { captcha, user, phone, mail } }) {
        return await this._transfer('firstStep', { captcha, user, phone, mail });
    }

    async verify({ params: { user, ...data } }) {
        return await this._transfer('verify', { user, ...data });
    }

    async toBlockChain({ params: { user, owner, active, posting, memo } }) {
        return await this._transfer('toBlockChain', { user, owner, active, posting, memo });
    }

    async changePhone({ params: { user, phone, captcha } }) {
        return await this._transfer('changePhone', { user, phone, captcha });
    }

    async resendSmsCode({ params: { user, phone } }) {
        return await this._transfer('resendSmsCode', { user, phone });
    }

    async subscribeOnSmsGet({ channelId, params: { user, phone } }) {
        return await this._transfer('subscribeOnSmsGet', { channelId, user, phone });
    }

    async _transfer(method, data) {
        return await this.sendTo('registration', method, data);
    }
}

module.exports = Registration;
