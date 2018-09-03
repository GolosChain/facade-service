const core = require('gls-core-service');
const BasicService = core.service.Basic;
const Gate = core.service.Gate;
const env = require('../Env');
const Options = require('./handler/Options');
const Subscribe = require('./handler/Subscribe');
const History = require('./handler/History');
const Transfer = require('./handler/Transfer');
const Offline = require('./handler/Offline');
const Registration = require('./handler/Registration');

class Router extends BasicService {
    constructor() {
        super();

        this._gate = new Gate();
        this._options = new Options(this._gate);
        this._subscribe = new Subscribe(this._gate);
        this._history = new History(this._gate);
        this._transfer = new Transfer(this._gate);
        this._offline = new Offline(this._gate);
        this._registration = new Registration(this._gate);
    }

    async start() {
        await this._gate.start({
            serverRoutes: this._getRoutes(),
            requiredClients: {
                frontend: env.GLS_FRONTEND_GATE_CONNECT,
                onlineNotify: env.GLS_ONLINE_NOTIFY_CONNECT,
                notify: env.GLS_NOTIFY_CONNECT,
                options: env.GLS_OPTIONS_CONNECT,
                push: env.GLS_PUSH_CONNECT,
                mail: env.GLS_MAIL_CONNECT,
                registration: env.GLS_REGISTRATION_CONNECT,
            },
        });

        this.addNested(this._gate);
    }

    async stop() {
        await this.stopNested();
    }

    _getRoutes() {
        const options = this._options;
        const subscribe = this._subscribe;
        const history = this._history;
        const transfer = this._transfer;
        const offline = this._offline;
        const registration = this._registration;

        return {
            /* public points */
            offline: offline.handle.bind(offline),
            getOptions: options.get.bind(options),
            setOptions: options.set.bind(options),
            onlineNotifyOn: subscribe.onlineNotifyOn.bind(subscribe),
            onlineNotifyOff: subscribe.onlineNotifyOff.bind(subscribe),
            pushNotifyOn: subscribe.pushNotifyOn.bind(subscribe),
            getNotifyHistory: history.notify.bind(history),
            getNotifyHistoryFresh: history.notifyFresh.bind(history),
            getFavorites: options.getFavorites.bind(options),
            addFavorite: options.addFavorite.bind(options),
            removeFavorite: options.removeFavorite.bind(options),
            'registration.getState': registration.getState.bind(registration),
            'registration.firstStep': registration.firstStep.bind(registration),
            'registration.verify': registration.verify.bind(registration),
            'registration.toBlockChain': registration.toBlockChain.bind(registration),
            'registration.changePhone': registration.changePhone.bind(registration),
            'registration.resendSmsCode': registration.resendSmsCode.bind(registration),
            'registration.subscribeOnSmsGet': registration.subscribeOnSmsGet.bind(registration),

            /* inner services only */
            transfer: transfer.handle.bind(transfer),
        };
    }
}

module.exports = Router;
