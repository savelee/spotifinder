Ext.define('Engine.store.Recents', {
    extend: 'Engine.store.LastFmResults',
    storeId: 'Recents',
    model: 'Engine.model.Recent',

    alias: 'store.recents'
});
