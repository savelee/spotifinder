Ext.define('Engine.store.Settings', {
    extend: 'Ext.data.Store',
    requires: ['Engine.model.Setting'],

    model: 'Engine.model.Setting',

    alias: 'store.settings',
    storeId: 'Settings',

    autoLoad: true,
    pageSize: 1
});