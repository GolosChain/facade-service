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
const Bandwidth = require('../controllers/Bandwidth');
const Iframely = require('../controllers/Iframely');
const Wallet = require('../controllers/Wallet');

class Connector extends BasicConnector {
    constructor() {
        super();

        const linking = { connector: this };

        this._options = new Options(linking);
        this._subscribe = new Subscribe(linking);
        this._history = new History(linking);
        this._transfer = new Transfer(linking);
        this._offline = new Offline(linking);
        this._registration = new Registration(linking);
        this._rates = new Rates(linking);
        this._content = new Content(linking);
        this._meta = new Meta(linking);
        this._bandwidth = new Bandwidth(linking);
        this._iframely = new Iframely(linking);
        this._wallet = new Wallet(linking);
    }

    _enableSecure(handler) {
        return async params => {
            if (params.auth && params.auth.user) {
                return await handler(params);
            } else {
                throw {
                    code: 1103,
                    message: 'Unauthorized request: access denied',
                };
            }
        };
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
        const bandwidth = this._bandwidth;
        const iframely = this._iframely;
        const wallet = this._wallet;

        await super.start({
            serverRoutes: {
                /* public points */
                'options.get': this._enableSecure(options.get.bind(options)),
                'options.set': this._enableSecure(options.set.bind(options)),
                'onlineNotify.on': this._enableSecure(subscribe.onlineNotifyOn.bind(subscribe)),
                'onlineNotify.off': this._enableSecure(subscribe.onlineNotifyOff.bind(subscribe)),
                'onlineNotify.history': this._enableSecure(history.onlineNotify.bind(history)),
                'onlineNotify.historyFresh': this._enableSecure(
                    history.onlineNotifyFresh.bind(history)
                ),
                'push.notifyOn': this._enableSecure(subscribe.pushNotifyOn.bind(subscribe)),
                'push.notifyOff': this._enableSecure(subscribe.pushNotifyOff.bind(subscribe)),
                'push.history': this._enableSecure(history.push.bind(history)),
                'push.historyFresh': this._enableSecure(history.pushFresh.bind(history)),
                'notify.getHistory': this._enableSecure(history.notify.bind(history)),
                'notify.getHistoryFresh': this._enableSecure(history.notifyFresh.bind(history)),
                'notify.markAsViewed': this._enableSecure(history.markAsViewed.bind(history)),
                'notify.markAllAsViewed': this._enableSecure(history.markAllAsViewed.bind(history)),
                'notify.markAsRead': this._enableSecure(history.markAsRead.bind(history)),
                'notify.markAllAsRead': this._enableSecure(history.markAllAsRead.bind(history)),
                'notify.getBlackList': this._enableSecure(options.getBlackList.bind(options)),
                'notify.addToBlackList': this._enableSecure(options.addToBlackList.bind(options)),
                'notify.removeFromBlackList': this._enableSecure(
                    options.removeFromBlackList.bind(options)
                ),
                'favorites.get': this._enableSecure(options.getFavorites.bind(options)),
                'favorites.add': this._enableSecure(options.addFavorite.bind(options)),
                'favorites.remove': this._enableSecure(options.removeFavorite.bind(options)),
                'registration.getState': registration.getState.bind(registration),
                'registration.firstStep': registration.firstStep.bind(registration),
                'registration.verify': registration.verify.bind(registration),
                'registration.setUsername': registration.setUsername.bind(registration),
                'registration.toBlockChain': registration.toBlockChain.bind(registration),
                'registration.changePhone': registration.changePhone.bind(registration),
                'registration.resendSmsCode': registration.resendSmsCode.bind(registration),
                'registration.subscribeOnSmsGet': registration.subscribeOnSmsGet.bind(registration),
                'rates.getActual': rates.getActual.bind(rates),
                'rates.getHistorical': rates.getHistorical.bind(rates),
                'rates.getHistoricalMulti': rates.getHistoricalMulti.bind(rates),
                'content.getComments': content.getComments.bind(content),
                'content.getPost': content.getPost.bind(content),
                'content.getFeed': content.getFeed.bind(content),
                'content.getProfile': content.getProfile.bind(content),
                'meta.getPostsViewCount': this._enableSecure(meta.getPostsViewCount.bind(meta)),
                'meta.recordPostView': this._enableSecure(meta.recordPostView.bind(meta)),
                'meta.markUserOnline': this._enableSecure(meta.markUserOnline.bind(meta)),
                'meta.getUserLastOnline': this._enableSecure(meta.getUserLastOnline.bind(meta)),
                'bandwidth.provide': this._enableSecure(bandwidth.provideBandwidth.bind(bandwidth)),
                'frame.getEmbed': iframely.getEmbed.bind(iframely),
                'wallet.getHistory': wallet.getHistory.bind(wallet),
                'wallet.getBalance': wallet.getBalance.bind(wallet),

                /* service points */
                offline: this._enableSecure(offline.handle.bind(offline)),

                /* inner services only points */
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
                bandwidth: env.GLS_BANDWIDTH_PROVIDER_CONNECT,
                wallet: env.GLS_WALLET_CONNECT,
            },
        });
    }
}

module.exports = Connector;
