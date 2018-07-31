const core = require('gls-core-service');
const BasicService = core.service.Basic;
const Gate = core.service.Gate;
const env = require('../Env');
const Options = require('./handler/Options');
const Subscribe = require('./handler/Subscribe');
const History = require('./handler/History');
const Transfer = require('./handler/Transfer');
const Offline = require('./handler/Offline');

// TODO notify unsubscribe on offline
// TODO check transfer error
// TODO change notify history api
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
                transfer: this._transfer.handle.bind(this),
                offline: this._offline.handle.bind(this),
                getOptions: this._options.get.bind(this),
                setOptions: this._options.set.bind(this),
                onlineNotifyOn: this._subscribe.onlineNotifyOn.bind(this),
                onlineNotifyOff: this._subscribe.onlineNotifyOff.bind(this),
                pushNotifyOn: this._subscribe.pushNotifyOn.bind(this),
                getNotifyHistory: this._history.notify.bind(this),
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
