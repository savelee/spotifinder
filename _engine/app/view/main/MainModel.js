/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Engine.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    requires:[
        'Engine.store.Artists',
        'Engine.store.Albums',
        'Engine.store.Recents',
        'Engine.store.Settings'
    ],

    data: {
        username: "",
        spotifyusername: "",
        period: null
    },

    stores: {
        'settings': {
            type: 'settings'
        }
    }
});
