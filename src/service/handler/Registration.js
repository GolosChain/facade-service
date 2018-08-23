const core = require('gls-core-service');
const stats = core.Stats.client;
const Abstract = require('./Abstract');

class Registration extends Abstract {
    firstStep({ params: { user } }) {
        // TODO -
    }

    verify({ params: { user } }) {
        // TODO -
    }

    toBlockChain({ params: { user } }) {
        // TODO -
    }

    changePhone({ params: { user } }) {
        // TODO -
    }

    resendSmsCode({ params: { user } }) {
        // TODO -
    }

    subscribeOnSmsGet({ params: { user } }) {
        // TODO -
    }
}

module.exports = Registration;
