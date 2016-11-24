Ext.define('Engine.store.Artists', {
    extend: 'Engine.store.LastFmResults',
    storeId: 'Artists',
    model: 'Engine.model.Artist',

    alias: 'store.artists'
});
