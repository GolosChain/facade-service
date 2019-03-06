const fetch = require('node-fetch');
const core = require('gls-core-service');
const Basic = core.controllers.Basic;
const Logger = core.utils.Logger;
const env = require('../data/env');
const URL_PATTERN = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

class Iframely extends Basic {
    async getEmbed({ params: { type, url } }) {
        this._validateTypeOrThrow(type);
        this._validateUrlOrThrow(url);

        const embedUrl = `${env.GLS_IFRAMELY_CONNECT}/${type}?url=${url}`;

        try {
            const response = await fetch(embedUrl);
            if (response.ok) {
                return await response.json();
            } else {
                throw {
                    code: 1102,
                    message: 'Iframely error',
                    error: await response.text(),
                };
            }
        } catch (error) {
            Logger.error('Iframely error -- ', error.stack || error);
            throw error;
        }
    }

    _validateTypeOrThrow(type) {
        const typeIsValid = ['oembed', 'iframely'].indexOf(type) === -1 ? false : true;

        if (!typeIsValid) {
            throw {
                code: 1101,
                message: `Type ${type} is not a valid type`,
            };
        }
    }

    _validateUrlOrThrow(url) {
        const urlIsValid = Boolean(URL_PATTERN.test(url));

        if (!urlIsValid) {
            throw {
                code: 1101,
                message: `URL ${url} is not a valid URL`,
            };
        }
    }
}

module.exports = Iframely;
