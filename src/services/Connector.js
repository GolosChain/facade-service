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

    _checkAuth(params) {
        if (params.auth && params.auth.user) {
            return params;
        }
        throw {
            code: 1103,
            message: 'Unauthorized request: access denied',
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
                'options.get': {
                    handler: options.get,
                    scope: options,
                    before: [
                        {
                            handler: this._checkAuth,
                            scope: this,
                        },
                    ],
                },
                'options.set': {
                    handler: options.set,
                    scope: options,
                    before: [
                        {
                            handler: this._checkAuth,
                            scope: this,
                        },
                    ],
                },
                'onlineNotify.on': {
                    handler: subscribe.onlineNotifyOn,
                    scope: subscribe,
                    before: [
                        {
                            handler: this._checkAuth,
                            scope: this,
                        },
                    ],
                },
                'onlineNotify.off': {
                    handler: subscribe.onlineNotifyOff,
                    scope: subscribe,
                    before: [
                        {
                            handler: this._checkAuth,
                            scope: this,
                        },
                    ],
                },
                'onlineNotify.history': {
                    handler: history.onlineNotify,
                    scope: history,
                    before: [
                        {
                            handler: this._checkAuth,
                            scope: this,
                        },
                    ],
                },
                'onlineNotify.historyFresh': {
                    handler: history.onlineNotifyFresh,
                    scope: history,
                    before: [
                        {
                            handler: this._checkAuth,
                            scope: this,
                        },
                    ],
                },
                'push.notifyOn': {
                    handler: subscribe.pushNotifyOn,
                    scope: subscribe,
                    before: [
                        {
                            handler: this._checkAuth,
                            scope: this,
                        },
                    ],
                },
                'push.notifyOff': {
                    handler: subscribe.pushNotifyOff,
                    scope: subscribe,
                    before: [
                        {
                            handler: this._checkAuth,
                            scope: this,
                        },
                    ],
                },
                'push.history': {
                    handler: history.push,
                    scope: history,
                    before: [
                        {
                            handler: this._checkAuth,
                            scope: this,
                        },
                    ],
                },
                'push.historyFresh': {
                    handler: history.pushFresh,
                    scope: history,
                    before: [
                        {
                            handler: this._checkAuth,
                            scope: this,
                        },
                    ],
                },
                'notify.getHistory': {
                    handler: history.notify,
                    scope: history,
                    before: [
                        {
                            handler: this._checkAuth,
                            scope: this,
                        },
                    ],
                },
                'notify.getHistoryFresh': {
                    handler: history.notifyFresh,
                    scope: history,
                    before: [
                        {
                            handler: this._checkAuth,
                            scope: this,
                        },
                    ],
                },
                'notify.markAsViewed': {
                    handler: history.markAsViewed,
                    scope: history,
                    before: [
                        {
                            handler: this._checkAuth,
                            scope: this,
                        },
                    ],
                },
                'notify.markAllAsViewed': {
                    handler: history.markAllAsViewed,
                    scope: history,
                    before: [
                        {
                            handler: this._checkAuth,
                            scope: this,
                        },
                    ],
                },
                'notify.markAsRead': {
                    handler: history.markAsRead,
                    scope: history,
                    before: [
                        {
                            handler: this._checkAuth,
                            scope: this,
                        },
                    ],
                },
                'notify.markAllAsRead': {
                    handler: history.markAllAsRead,
                    scope: history,
                    before: [
                        {
                            handler: this._checkAuth,
                            scope: this,
                        },
                    ],
                },
                'notify.getBlackList': {
                    handler: options.getBlackList,
                    scope: options,
                    before: [
                        {
                            handler: this._checkAuth,
                            scope: this,
                        },
                    ],
                },
                'notify.addToBlackList': {
                    handler: options.addToBlackList,
                    scope: options,
                    before: [
                        {
                            handler: this._checkAuth,
                            scope: this,
                        },
                    ],
                },
                'notify.removeFromBlackList': {
                    handler: options.removeFromBlackList,
                    scope: options,
                    before: [
                        {
                            handler: this._checkAuth,
                            scope: this,
                        },
                    ],
                },
                'favorites.get': {
                    handler: options.getFavorites,
                    scope: options,
                    before: [
                        {
                            handler: this._checkAuth,
                            scope: this,
                        },
                    ],
                },
                'favorites.add': {
                    handler: options.addFavorite,
                    scope: options,
                    before: [
                        {
                            handler: this._checkAuth,
                            scope: this,
                        },
                    ],
                },
                'favorites.remove': {
                    handler: options.removeFavorite,
                    scope: options,
                    before: [
                        {
                            handler: this._checkAuth,
                            scope: this,
                        },
                    ],
                },
                'registration.getState': {
                    handler: registration.getState,
                    scope: registration,
                },
                'registration.firstStep': {
                    handler: registration.firstStep,
                    scope: registration,
                },
                'registration.verify': {
                    handler: registration.verify,
                    scope: registration,
                },
                'registration.setUsername': {
                    handler: registration.setUsername,
                    scope: registration,
                },
                'registration.toBlockChain': {
                    handler: registration.toBlockChain,
                    scope: registration,
                },
                'registration.changePhone': {
                    handler: registration.changePhone,
                    scope: registration,
                },
                'registration.resendSmsCode': {
                    handler: registration.resendSmsCode,
                    scope: registration,
                },
                'registration.subscribeOnSmsGet': {
                    handler: registration.subscribeOnSmsGet,
                    scope: registration,
                },
                'rates.getActual': {
                    handler: rates.getActual,
                    scope: rates,
                },
                'rates.getHistorical': {
                    handler: rates.getHistorical,
                    scope: rates,
                },
                'rates.getHistoricalMulti': {
                    handler: rates.getHistoricalMulti,
                    scope: rates,
                },
                'content.getComment': {
                    handler: content.getComment,
                    scope: content,
                },
                'content.getComments': {
                    handler: content.getComments,
                    scope: content,
                },
                'content.getPost': {
                    handler: content.getPost,
                    scope: content,
                },
                'content.getFeed': {
                    handler: content.getFeed,
                    scope: content,
                },
                'content.getProfile': {
                    handler: content.getProfile,
                    scope: content,
                },
                'content.getChargers': {
                    handler: content.getChargers,
                    scope: content,
                },
                'content.getLeadersTop': {
                    handler: content.getLeadersTop,
                    scope: content,
                },
                'content.getHashTagTop': {
                    handler: content.getHashTagTop,
                    scope: content,
                },
                'content.waitForBlock': {
                    handler: content.waitForBlock,
                    scope: content,
                },
                'content.waitForTransaction': {
                    handler: content.waitForTransaction,
                    scope: content,
                },
                'content.search': {
                    handler: content.search,
                    scope: content,
                },
                'content.getPostVotes': {
                    handler: content.getPostVotes,
                    scope: content,
                },
                'content.getCommentVotes': {
                    handler: content.getCommentVotes,
                    scope: content,
                },
                'content.resolveProfile': {
                    handler: content.resolveProfile,
                    scope: content,
                },
                'content.getSubscriptions': {
                    handler: content.getSubscriptions,
                    scope: content,
                },
                'content.getSubscribers': {
                    handler: content.getSubscribers,
                    scope: content,
                },
                'content.getProposals': {
                    handler: content.getProposals,
                    scope: content,
                },
                'content.getHeaders': {
                    handler: content.getHeaders,
                    scope: content,
                },
                'meta.getPostsViewCount': {
                    handler: meta.getPostsViewCount,
                    scope: meta,
                },
                'meta.recordPostView': {
                    handler: meta.recordPostView,
                    scope: meta,
                },
                'meta.markUserOnline': {
                    handler: meta.markUserOnline,
                    scope: meta,
                    before: [
                        {
                            handler: this._checkAuth,
                            scope: this,
                        },
                    ],
                },
                'meta.getUserLastOnline': {
                    handler: meta.getUserLastOnline,
                    scope: meta,
                },
                'bandwidth.provide': {
                    handler: bandwidth.provideBandwidth,
                    scope: bandwidth,
                    before: [
                        {
                            handler: this._checkAuth,
                            scope: this,
                        },
                    ],
                },
                'frame.getEmbed': {
                    handler: iframely.getEmbed,
                    scope: iframely,
                },
                'wallet.getTransferHistory': {
                    handler: wallet.getTransferHistory,
                    scope: wallet,
                },
                'wallet.getRewardsHistory': {
                    handler: wallet.getRewardsHistory,
                    scope: wallet,
                },
                'wallet.getVestingHistory': {
                    handler: wallet.getVestingHistory,
                    scope: wallet,
                },
                'wallet.getBalance': {
                    handler: wallet.getBalance,
                    scope: wallet,
                },
                'wallet.getDelegationState': {
                    handler: wallet.getDelegationState,
                    scope: wallet,
                },
                'wallet.getTokensInfo': {
                    handler: wallet.getTokensInfo,
                    scope: wallet,
                },
                'wallet.getVestingInfo': {
                    handler: wallet.getVestingInfo,
                    scope: wallet,
                },
                'wallet.convertVestingToToken': {
                    handler: wallet.convertVestingToToken,
                    scope: wallet,
                },
                'wallet.convertTokensToVesting': {
                    handler: wallet.convertTokensToVesting,
                    scope: wallet,
                },

                /* service points */
                offline: {
                    handler: offline.handle,
                    scope: offline,
                    before: [
                        {
                            handler: this._checkAuth,
                            scope: this,
                        },
                    ],
                },

                /* inner services only points */
                transfer: {
                    handler: transfer.handle,
                    scope: transfer,
                },
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
                search: env.GLS_SEARCH_CONNECT,
                meta: env.GLS_META_CONNECT,
                bandwidth: env.GLS_BANDWIDTH_PROVIDER_CONNECT,
                wallet: env.GLS_WALLET_CONNECT,
            },
        });
    }
}

module.exports = Connector;
