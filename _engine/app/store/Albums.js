Ext.define('Engine.store.Albums', {
    extend: 'Engine.store.LastFmResults',
    storeId: 'Albums',
    model: 'Engine.model.Album',

    alias: 'store.albums'
});
