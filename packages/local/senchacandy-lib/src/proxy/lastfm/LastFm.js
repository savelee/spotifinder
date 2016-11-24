/**
 * @author Lee Boonstra
 *
 * This is a proxy specific for the lastfm webservice.
 * It is possible to retrieve lastfm user data.
 *
 *     Ext.define('Music', {
 *         extend: 'Ext.data.Model',
 *         fields: ['id', 'artist', 'playcount']
 *     });
 *
 *     //The Store contains the LastFMProxy as an inline configuration
 *     var store = Ext.create('Ext.data.Store', {
 *         model: 'Music',
 *         proxy: {
 *          type: 'lastfm',
 *          apiKey: '14...5',
 *          apiSecret: '84..04',
 *          method: 'getArtist',
 *          userName: 'savelee' //Lee Boonstra's fav music :)
 *         }
 *     });
 *
 *     store.load();
 */
Ext.define('SenchaCandyShared.proxy.lastfm.LastFm', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.sclastfm',

    //mixins: [
    //    'Ext.mixin.Mashup'
    //],
    //requiredScripts: [
    //    '../packages/sencha-plugins/src/proxy/lastfm/lastfm.api.cache.js',
    //    '../packages/sencha-plugins/src/proxy/lastfm/lastfm.api.js',
    //    '../packages/sencha-plugins/src/proxy/lastfm/lastfm.api.md5.js'
    //],

    lastFm: null,
    lastFmCache: null,

    config: {

        /**
         * @cfg {string} apiKey
         * LastFm Developers Api Key
         * @accessor
         */
        apiKey: '',

        /**
         * @cfg {string} apiSecret
         * LastFm Developers Api Secret
         * @accessor
         */
        apiSecret: '',

        /**
         * @cfg {String} userName
         * LastFm username to retrieve data from
         * @accessor
         */
        userName: '',


        /**
         * @cfg {String} userName
         * LastFm username to retrieve data from
         * @accessor
         */
        period: 'overall',


        /**`
         * @cfg {String} method
         * The name of the lastfm method to use. Defaults to 'getArtists' method. Other options are: 'getTracks' or 'getAlbums'.
         */
        lastFmMethod: 'getArtists',

        secure: '0',

        url: '//ws.audioscrobbler.com/2.0/'
    },

    constructor: function(config){
        var me = this;

        me.setConfig(config);

        me.callParent(config);

        // Requires a configuration
        if (Ext.isEmpty(config)) {
            Ext.Error.raise('A configuration is needed!');
            return false;
        }

        this.mixins.observable.constructor.call(this, config);

        var cache = new LastFMCache();
        var lastFm = new LastFM({
            apiKey    : me.getApiKey(),
            apiSecret : me.getApiSecret(),
            user: me.getUserName(),
            secure: me.getSecure(),
            apiUrl: me.getUrl(),
            cache     : cache
        });

        me.lastFmCache = cache;
        me.lastFm = lastFm;

        return me;
    },
    read: function(operation, callback, scope){

        var me = this,
            i = 0,
            Model = me.getModel(),
            results = [];

        //<debug>
        if(!me.getApiKey() || !me.getApiSecret()){
            Ext.Error.raise("The apiKey and/or apiSecret is missing for the LastFm proxy.");
            return false;
        }
        if(!me.getUserName()) {
            Ext.Error.raise("A LastFm username is required for the LastFm proxy.");
            return false;
        }
        //</debug>

        operation.setStarted();

        var onSuccess = function(data){
            me.fireEvent('success-api');
            var result = data.results;

            for(i;i<result.length;i++){
                results.push(Ext.create(Model, result[i]));
            }

            operation.setResultSet(Ext.create('Ext.data.ResultSet', {
                records: results,
                count: data.perPage,
                total  : data.total,
                loaded : true
            }));

            operation.setSuccessful(true);

            if (typeof callback == 'function') {
                callback.call(scope || this, operation);
            }
        }


        if(me.getLastFmMethod() == 'getArtists') {
            me.getArtists(operation, onSuccess);
        } else if(me.getLastFmMethod() == 'getTracks') {
            me.getTracks(operation, onSuccess);
        } else if(me.getLastFmMethod() == 'getRecents') {
            me.getRecents(operation, onSuccess);
        } else if(me.getLastFmMethod() == 'getAlbums') {
            me.getAlbums(operation, onSuccess);
        } else {
            //<debug>
                Ext.Error.raise("The lastFmMethod is missing or incorrect for the lastFm proxy.");
                return false;
            //</debug>
        }

        return;
    },

    getArtists: function(operation, callback){

        var response = {},
            l = this.lastFm,
            username = this.getUserName(),
            period = this.getPeriod();

        l.user.getTopArtists({
            user: username,
            start: operation.getStart(),
            page: operation.getPage(),
            limit: operation.getLimit(),
            period: period
        }, {
            success: function(data){
                response.success = true;
                response.total = data.topartists["@attr"].total;
                response.totalPages = data.topartists["@attr"].totalPages;
                response.perPage = data.topartists["@attr"].perPage;
                response.page = data.topartists["@attr"].page;
                response.results = data.topartists.artist;
                callback(response);
            },
            error: function(code, message){
                response.success = false;
                response.results = [];
                response.total = 0;
                response.totalPages = 0;
                response.perPage = 0;
                response.page = 0;
                response.msg = message;
                response.errorCode = code;
                callback(response);
            }
        });
    },
    getAlbums: function(operation, callback){
        var response = {},
            l = this.lastFm,
            username = this.getUserName(),
            period = this.getPeriod();

        l.user.getTopAlbums({
            user: username,
            start: operation.getStart(),
            page: operation.getPage(),
            limit: operation.getLimit(),
            period: period
        }, {
            success: function(data){
                response.success = true;
                response.total = data.topalbums["@attr"].total;
                response.totalPages = data.topalbums["@attr"].totalPages;
                response.perPage = data.topalbums["@attr"].perPage;
                response.page = data.topalbums["@attr"].page;
                response.results = data.topalbums.album;

                callback(response);
            },
            error: function(code, message){
                response.success = false;
                response.results = [];
                response.total = 0;
                response.totalPages = 0;
                response.perPage = 0;
                response.page = 0;
                response.msg = message;
                response.errorCode = code;
                callback(response);
            }
        });
    },
    getRecents: function(operation, callback){
        var response = {},
            l = this.lastFm,
            username = this.getUserName();

        l. user.getRecentTracks({
            user: username,
            start: operation.getStart(),
            page: operation.getPage(),
            limit: operation.getLimit()
        }, {
            success: function(data){
                response.success = true;
                response.total = data.recenttracks["@attr"].total;
                response.totalPages = data.recenttracks["@attr"].totalPages;
                response.perPage = data.recenttracks["@attr"].perPage;
                response.page = data.recenttracks["@attr"].page;
                response.results = data.recenttracks.track;

                callback(response);
            },
            error: function(code, message){
                response.success = false;
                response.results = [];
                response.total = 0;
                response.totalPages = 0;
                response.perPage = 0;
                response.page = 0;
                response.msg = message;
                response.errorCode = code;
                callback(response);
            }
        });
    },
    getTracks: function(operation, callback){
        var response = {},
            l = this.lastFm,
            username = this.getUserName();

        l.library.getTracks({
            user: username,
            start: operation.getStart(),
            page: operation.getPage(),
            limit: operation.getLimit()
        }, {
            success: function(data){
                response.success = true;
                response.total = data.tracks["@attr"].total;
                response.totalPages = data.tracks["@attr"].totalPages;
                response.perPage = data.tracks["@attr"].perPage;
                response.page = data.tracks["@attr"].page;
                response.results = data.tracks.track;
                callback(response);
            },
            error: function(code, message){
                response.success = false;
                response.results = [];
                response.total = 0;
                response.totalPages = 0;
                response.perPage = 0;
                response.page = 0;
                response.msg = message;
                response.errorCode = code;
                callback(response);
            }
        });
    }
});
