const R = require('ramda');
const core = require('gls-core-service');
const stats = core.Stats.client;

class Subscribe {
    constructor(gate) {
        this._gate = gate;
    }

    async onlineNotifyOn(data) {
        const time = new Date();

        await this._gate.sendTo('notify', 'subscribe', data);

        stats.timing('online_notify_on', new Date() - time);
        return 'Ok';
    }

    async onlineNotifyOff(data) {
        const time = new Date();

        await this._gate.sendTo('notify', 'unsubscribe', data);

        stats.timing('online_notify_off', new Date() - time);
        return 'Ok';
    }

    async pushNotifyOn({ user, params: { key, deviceType } }) {
        const time = new Date();

        if (!R.all(R.is(String), [key, deviceType])) {
            throw { code: 400, message: 'Invalid params.' };
        }

        if (!['ios', 'android', 'web'].includes(deviceType)) {
            throw { code: 400, message: 'Invalid device type.' };
        }

        if (key.length < 10) {
            throw { code: 400, message: 'Too short key.' };
        }

        await this._gate.sendTo('push', 'subscribe', { user, key, deviceType });

        stats.timing('push_notify_on', new Date() - time);
        return 'Ok';
    }
}

module.exports = Subscribe;
