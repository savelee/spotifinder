/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('Engine.Application', {
    extend: 'Ext.app.Application',

    name: 'Engine',

    requires: [
      'Engine.utils.Constants',
      'Engine.manager.Settings',
      'Engine.manager.Spotify',
      'Engine.manager.OfflineMode'
    ],

    controllers: [
    	'Global'
    ],

    launch: function () {
        //<debug>
        //SenchaInspector.init();
        //</debug>

        Engine.manager.OfflineMode.init();
    },

    onAppUpdate: function () {
        if(Ext.platformTags.modern){
            window.confirm("This application has an update. Reload?");
        } else {
            Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
                function (choice) {
                    if (choice === 'yes') {
                        window.location.reload();
                    }
                }
            );
        }
    }
});
