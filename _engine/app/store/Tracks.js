Ext.define('Engine.store.Tracks', {
    extend: 'Engine.store.LastFmResults',
    storeId: 'Tracks',
    model: 'Engine.model.Track',

    alias: 'store.tracks'
});