const core = require('gls-core-service');
const Basic = core.controllers.Basic;

class Options extends Basic {
    async get({ user, params: { profile } }) {
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

        return { basic, notify, push };
    }

    async set({ user, params: { profile, basic, notify, push } }) {
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

        if (errors.length) {
            throw { code: 500, message: `Some options not changed - ${errors.join(' | ')}` };
        }

        return 'Ok';
    }

    async getFavorites({ user }) {
        const data = { user };

        return await this.callService('options', 'getFavorites', data);
    }

    async addFavorite({ user, params: { permlink } }) {
        const data = { user, permlink };

        return await this.callService('options', 'addFavorite', data);
    }

    async removeFavorite({ user, params: { permlink } }) {
        const data = { user, permlink };

        return await this.callService('options', 'removeFavorite', data);
    }

    async getBlackList({ user: owner }) {
        const data = { owner };

        return await this.callService('notify', 'getBlackList', data);
    }

    async addToBlackList({ user: owner, params: { banned } }) {
        const data = { owner, banned };

        return await this.callService('notify', 'addToBlackList', data);
    }

    async removeFromBlackList({ user: owner, params: { banned } }) {
        const data = { owner, banned };

        return await this.callService('notify', 'removeFromBlackList', data);
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
