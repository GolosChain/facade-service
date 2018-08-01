const core = require('gls-core-service');
const BasicService = core.service.Basic;
const Gate = core.service.Gate;
const env = require('../Env');
const Options = require('./handler/Options');
const Subscribe = require('./handler/Subscribe');
const History = require('./handler/History');
const Transfer = require('./handler/Transfer');
const Offline = require('./handler/Offline');

class Router extends BasicService {
    constructor() {
        super();

        this._gate = new Gate();
        this._options = new Options(this._gate);
        this._subscribe = new Subscribe(this._gate);
        this._history = new History(this._gate);
        this._transfer = new Transfer(this._gate);
        this._offline = new Offline(this._gate);
    }

    async start() {
        await this._gate.start({
            serverRoutes: {
                /* public points */
                offline: this._offline.handle.bind(this._offline),
                getOptions: this._options.get.bind(this._options),
                setOptions: this._options.set.bind(this._options),
                onlineNotifyOn: this._subscribe.onlineNotifyOn.bind(this._subscribe),
                onlineNotifyOff: this._subscribe.onlineNotifyOff.bind(this._subscribe),
                pushNotifyOn: this._subscribe.pushNotifyOn.bind(this._subscribe),
                getNotifyHistory: this._history.notify.bind(this._history),

                /* inner services only */
                transfer: this._transfer.handle.bind(this._transfer),
            },
            requiredClients: {
                frontend: env.GLS_FRONTEND_GATE_CONNECT,
                notifyOnline: env.GLS_NOTIFY_ONLINE_CONNECT,
                notifyRegistrator: env.GLS_NOTIFY_REGISTRATOR_CONNECT,
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
