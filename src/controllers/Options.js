const core = require('gls-core-service');
const Basic = core.controllers.Basic;

class Options extends Basic {
    async get({ auth: { user }, params: { profile } }) {
        const data = { user, profile };

        const basic = Object(
            await this._tryGetOptionsBy({
                service: 'options',
                method: 'get',
                errorPrefix: 'Basic',
                data,
            })
        );

        const notify = Object(
            await this._tryGetOptionsBy({
                service: 'onlineNotify',
                method: 'getOptions',
                errorPrefix: 'Notify',
                data,
            })
        );

        const push = Object(
            await this._tryGetOptionsBy({
                service: 'push',
                method: 'getOptions',
                errorPrefix: 'Push',
                data,
            })
        );

        return { basic, notify, push };
    }

    async set({ auth: { user }, params: { profile, basic, notify, push } }) {
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

    async getFavorites({ auth: { user } }) {
        const data = { user };

        return await this.callService('options', 'getFavorites', data);
    }

    async addFavorite({ auth: { user }, params: { permlink } }) {
        const data = { user, permlink };

        return await this.callService('options', 'addFavorite', data);
    }

    async removeFavorite({ auth: { user }, params: { permlink } }) {
        const data = { user, permlink };

        return await this.callService('options', 'removeFavorite', data);
    }

    async getBlackList({ auth: { user: owner } }) {
        const data = { owner };

        return await this.callService('notify', 'getBlackList', data);
    }

    async addToBlackList({ auth: { user: owner }, params: { banned } }) {
        const data = { owner, banned };

        return await this.callService('notify', 'addToBlackList', data);
    }

    async removeFromBlackList({ auth: { user: owner }, params: { banned } }) {
        const data = { owner, banned };

        return await this.callService('notify', 'removeFromBlackList', data);
    }

    async _tryGetOptionsBy({ service, method, errorPrefix, data }) {
        try {
            return await this.callService(service, method, data);
        } catch (error) {
            return this._makeGetError(error, errorPrefix);
        }
    }

    _makeGetError(error, prefix) {
        return { code: error.code, message: `${prefix} -> ${error.message}` };
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
