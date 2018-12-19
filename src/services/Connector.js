const core = require('gls-core-service');
const BasicConnector = core.services.Connector;
const env = require('../data/env');
const Options = require('../controllers/Options');
const Subscribe = require('../controllers/Subscribe');
const History = require('../controllers/History');
const Transfer = require('../controllers/Transfer');
const Offline = require('../controllers/Offline');
const Registration = require('../controllers/Registration');
const Rates = require('../controllers/Rates');
const Content = require('../controllers/Content');
const Meta = require('../controllers/Meta');

class Connector extends BasicConnector {
    constructor() {
        super();

        this._options = new Options({ connector: this });
        this._subscribe = new Subscribe({ connector: this });
        this._history = new History({ connector: this });
        this._transfer = new Transfer({ connector: this });
        this._offline = new Offline({ connector: this });
        this._registration = new Registration({ connector: this });
        this._rates = new Rates({ connector: this });
        this._content = new Content({ connector: this });
        this._meta = new Meta({ connector: this });
    }

    async start() {
        const options = this._options;
        const subscribe = this._subscribe;
        const history = this._history;
        const transfer = this._transfer;
        const offline = this._offline;
        const registration = this._registration;
        const rates = this._rates;
        const content = this._content;
        const meta = this._meta;

        await super.start({
            serverRoutes: {
                /* public points */
                offline: offline.handle.bind(offline),
                getOptions: options.get.bind(options),
                setOptions: options.set.bind(options),
                onlineNotifyOn: subscribe.onlineNotifyOn.bind(subscribe),
                onlineNotifyOff: subscribe.onlineNotifyOff.bind(subscribe),
                'onlineNotify.history': history.onlineNotify.bind(history),
                'onlineNotify.historyFresh': history.onlineNotifyFresh.bind(history),
                'push.notifyOn': subscribe.pushNotifyOn.bind(subscribe),
                'push.notifyOff': subscribe.pushNotifyOff.bind(subscribe),
                getNotifyHistory: history.notify.bind(history),
                getNotifyHistoryFresh: history.notifyFresh.bind(history),
                'notify.markAsViewed': history.markAsViewed.bind(history),
                'notify.markAllAsViewed': history.markAllAsViewed.bind(history),
                'notify.getBlackList': options.getBlackList.bind(options),
                'notify.addToBlackList': options.addToBlackList.bind(options),
                'notify.removeFromBlackList': options.removeFromBlackList.bind(options),
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
                'rates.getActual': rates.getActual.bind(rates),
                'rates.getHistorical': rates.getHistorical.bind(rates),
                'rates.getHistoricalMulti': rates.getHistoricalMulti.bind(rates),
                'content.getNaturalFeed': content.getNaturalFeed.bind(content),
                'content.getPopularFeed': content.getPopularFeed.bind(content),
                'content.getActualFeed': content.getActualFeed.bind(content),
                'content.getPromoFeed': content.getPromoFeed.bind(content),
                'content.getPersonalFeed': content.getPersonalFeed.bind(content),
                'meta.getPostsViewCount': meta.getPostsViewCount.bind(meta),
                'meta.recordPostView': meta.recordPostView.bind(meta),

                /* inner services only */
                transfer: transfer.handle.bind(transfer),
            },
            requiredClients: {
                frontend: env.GLS_FRONTEND_GATE_CONNECT,
                onlineNotify: env.GLS_ONLINE_NOTIFY_CONNECT,
                notify: env.GLS_NOTIFY_CONNECT,
                options: env.GLS_OPTIONS_CONNECT,
                push: env.GLS_PUSH_CONNECT,
                mail: env.GLS_MAIL_CONNECT,
                registration: env.GLS_REGISTRATION_CONNECT,
                rates: env.GLS_RATES_CONNECT,
                prism: env.GLS_PRISM_CONNECT,
                meta: env.GLS_META_CONNECT,
            },
        });
    }
}

module.exports = Connector;
