/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Engine.view.main.Main', {
    extend: 'Ext.navigation.View',
    xtype: 'app-main',

    requires: [
        'Ext.Toolbar',
        'Engine.view.main.MainModel',
        'Engine.view.main.MainControllerModern',
        'Engine.view.tabpanel.Panel',
        'Engine.view.settings.Settings'
    ],

    listeners: {
    	pop: 'onPop'
    },

    controller: 'main',
    viewModel: 'main',

    navigationBar: false,
    useTitleAsBackText: false,

    items: [{
        xtype: 'interface'
    }]
});
