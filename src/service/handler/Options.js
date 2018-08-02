const core = require('gls-core-service');
const stats = core.Stats.client;
const Abstract = require('./Abstract');

class Options extends Abstract {
    async get({ user, params: { profile } }) {
        const time = new Date();
        const data = { user, profile };

        let basic;
        const basicData = await this.sendTo('options', 'get', data);

        if (basicData.error) {
            throw basicData.error;
        } else {
            basic = basicData.result;
        }

        let notify;
        const notifyData = await this.sendTo('onlineNotify', 'getOptions', data);

        if (notifyData.error) {
            throw notifyData.error;
        } else {
            notify = notifyData.result;
        }

        let push;
        const pushData = await this.sendTo('push', 'getOptions', data);

        if (pushData.error) {
            throw pushData.error;
        } else {
            push = pushData.result;
        }

        let mail;
        const mailData = await this.sendTo('mail', 'getOptions', data);

        if (mailData.error) {
            throw mailData.error;
        } else {
            mail = mailData.result;
        }

        stats.timing('options_get', new Date() - time);
        return { basic, notify, push, mail };
    }

    async set({ user, params: { profile, basic, notify, push, mail } }) {
        const time = new Date();
        const data = { user, profile };
        const errors = [];

        if (basic) {
            const { error } = await this.sendTo('options', 'set', { basic, ...data });

            if (error) {
                errors.push(`Basic -> ${error}`);
            }
        }

        if (notify) {
            const { error } = await this.sendTo('onlineNotify', 'setOptions', { notify, ...data });

            if (error) {
                errors.push(`Notify -> ${error}`);
            }
        }

        if (push) {
            const { error } = await this.sendTo('push', 'setOptions', { push, ...data });

            if (error) {
                errors.push(`Push -> ${error}`);
            }
        }

        if (mail) {
            const { error } = await this.sendTo('mail', 'setOptions', { mail, ...data });

            if (error) {
                errors.push(`Mail -> ${error}`);
            }
        }

        if (errors.length) {
            throw { code: 500, message: `Some options not changed - ${errors.join(' | ')}` };
        }

        stats.timing('options_set', new Date() - time);
        return 'Ok';
    }
}

module.exports = Options;
