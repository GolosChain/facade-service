const core = require('gls-core-service');
const stats = core.Stats.client;
const Abstract = require('./Abstract');

class Options extends Abstract {
    async get({ user, params: { profile } }) {
        const time = new Date();
        const data = { user, profile };

        const basic = await this._tryGetOptionsBy({
            service: 'options',
            method: 'get',
            errorPrefix: 'Basic',
            data,
        });

        const notify = await this._tryGetOptionsBy({
            service: 'onlineNotify',
            method: 'getOptions',
            errorPrefix: 'Notify',
            data,
        });

        const push = await this._tryGetOptionsBy({
            service: 'push',
            method: 'getOptions',
            errorPrefix: 'Push',
            data,
        });

        // TODO just uncomment on mail service done
        /*const mail = await this._tryGetOptionsBy({
            service: 'mail',
            method: 'getOptions',
            errorPrefix: 'Mail',
            data,
        });*/

        stats.timing('options_get', new Date() - time);
        // TODO just uncomment on mail service done
        return { basic, notify, push /*, mail*/ };
    }

    async set({ user, params: { profile, basic, notify, push, mail } }) {
        const time = new Date();
        const errors = [];
        const trySetOptionsBy = this._makeOptionsSetter(user, profile, errors);

        if (basic) {
            await trySetOptionsBy({
                data: basic,
                service: 'options',
                method: 'set',
                errorPrefix: 'Basic',
            });
        }

        if (notify) {
            await trySetOptionsBy({
                data: notify,
                service: 'onlineNotify',
                method: 'setOptions',
                errorPrefix: 'Notify',
            });
        }

        if (push) {
            await trySetOptionsBy({
                data: push,
                service: 'push',
                method: 'setOptions',
                errorPrefix: 'Push',
            });
        }

        if (mail) {
            await trySetOptionsBy({
                data: mail,
                service: 'mail',
                method: 'setOptions',
                errorPrefix: 'Mail',
            });
        }

        if (errors.length) {
            stats.increment('options_set_error');
            throw { code: 500, message: `Some options not changed - ${errors.join(' | ')}` };
        }

        stats.timing('options_set', new Date() - time);
        return 'Ok';
    }

    async _tryGetOptionsBy({ service, method, errorPrefix, data }) {
        let result;
        const response = await this.sendTo(service, method, data);

        if (response.error) {
            throw this._makeGetError(response, errorPrefix);
        } else {
            result = response.result;
        }

        return result;
    }

    _makeGetError(response, prefix) {
        return { code: response.error.code, message: `${prefix} -> ${response.error.message}` };
    }

    _makeOptionsSetter(user, profile, errors) {
        return async ({ service, method, errorPrefix, data }) => {
            const { error } = await this.sendTo(service, method, { user, profile, data });

            if (error) {
                errors.push(`${errorPrefix} -> ${error.message}`);
            }
        };
    }
}

module.exports = Options;
