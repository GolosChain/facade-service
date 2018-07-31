const core = require('gls-core-service');
const stats = core.Stats.client;
const Abstract = require('./Abstract');

class Options extends Abstract {
    async get({ user, params: { profile } }) {
        const time = new Date();
        const data = { user, profile };

        const basic = await this.sendTo('options', 'get', data);
        const notify = await this.sendTo('notify', 'getOptions', data);
        const push = await this.sendTo('push', 'getOptions', data);
        const mail = await this.sendTo('mail', 'getOptions', data);

        stats.timing('options_get', new Date() - time);
        return { basic, notify, push, mail };
    }

    async set({ user, params: { profile, basic, notify, push, mail } }) {
        const time = new Date();
        const data = { user, profile };

        if (basic) {
            await this.sendTo('options', 'set', { basic, ...data });
        }

        if (notify) {
            await this.sendTo('notify', 'setOptions', { notify, ...data });
        }

        if (push) {
            await this.sendTo('push', 'setOptions', { push, ...data });
        }

        if (mail) {
            await this.sendTo('mail', 'setOptions', { mail, ...data });
        }

        stats.timing('options_set', new Date() - time);
        return 'Ok';
    }
}

module.exports = Options;
