const core = require('gls-core-service');
const stats = core.Stats.client;
const logger = core.Logger;
const BasicService = core.service.Basic;
const Gate = core.service.Gate;
const env = require('../Env');
const Options = require('./handler/Options');
const Subscribe = require('./handler/Subscribe');

class Router extends BasicService {
    constructor() {
        super();

        this._gate = new Gate();
        this._options = new Options(this._gate);
        this._subscribe = new Subscribe(this._gate);
    }

    async start() {
        await this._gate.start({
            serverRoutes: {
                getOptions: this._options.get,
                setOptions: this._options.set,
                subscribeOnOnlineNotify: this._subscribe.onlineNotifyOn,
                unsubscribeOnOnlineNotify: this._subscribe.onlineNotifyOff,
                subscribeOnPushNotify: this._subscribe.pushNotifyOn,
            },
            requiredClients: {
                frontend: env.GLS_FRONTEND_GATE_CONNECT,
                notify: env.GLS_NOTIFY_CONNECT,
                options: env.GLS_OPTIONS_CONNECT,
                push: env.GLS_PUSH_CONNECT,
                mail: env.GLS_MAIL_CONNECT,
            },
        });

        this.addNested(this._gate);
    }

    async stop() {
        await this.stopNested();
    }
}

module.exports = Router;
