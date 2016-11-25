Ext.define('Engine.model.LastFmResult', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.identifier.Sequential',
        'SenchaCandyShared.proxy.lastfm.LastFm'
    ],

    identifier: {
        type: 'sequential',
        //prefix: 'id_',
        seed: -2, //strange?
        increment: 1
    },

    idProperty: 'id',
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'playcount',
        type: 'int'
    }, {
        name: 'image'
    },
    {
        name: 'artistimage',
        calculate: function(data) {
            //if(window.location.protocol == "https:"){
            //    return null;
            //}

            if(data.image){
                var x = data.image.length;
                var url = data.image[x-1]['#text'];
                //if(Ext.platformTags.cordova || Ext.platformTags.webview){
                //    return url;
                //} else {
                //    return url.split('http:')[1];
                //}
                return url;
            }
        }
    },
    {
        name: 'artistimagesmall',
        calculate: function(data) {
            //if(window.location.protocol == "https:"){
            //    return null;
            //}
            if(data.image){
                var x = data.image.length;
                var url = data.image[0]['#text'];
                //if(Ext.platformTags.cordova || Ext.platformTags.webview){
                //    return url;
                //} else {
                //    return url.split('http:')[1];
                //}
                return url;
            }
        }
    }
  ],

  schema: {}

}, function(model){

    var p = "0";
    if(document.location.protocol == "https:") p = "1";

    //we have to do it this way, because Engine namespace
    //could not be available while reading this class
    //in the memory.
    model.prototype.schema.setNamespace('Engine.model');
    model.prototype.schema.setProxy({
        type: 'sclastfm',
        apiKey: Ext.manifest.constants.lastfm.key,
        apiSecret: Ext.manifest.constants.lastfm.secret,
        lastFmMethod: 'get{entityName}s',
        period: Engine.utils.Constants.PERIOD,
        userName: 'savelee',
        secure: p,
        // @sw-cache
        url: Ext.manifest.constants.lastfm.url
    });
    //<debug>
    if(Engine.utils.Constants.IS_MOCK){
        model.prototype.schema.setProxy({
            type: 'ajax',
            url: 'mocks/get{entityName}s.json',
            secure: p,
            reader: {
                type: 'json',
                rootProperty: 'results.data'
            }
        });
    }
    //</debug>
}
);
