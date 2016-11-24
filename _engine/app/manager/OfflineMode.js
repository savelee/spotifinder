Ext.define('Engine.manager.OfflineMode', {
    singleton: true,

    requires: [
    	'Ext.Promise'
    ],

    init: function(){
        var me = this;
        window.addEventListener('online', Engine.manager.OfflineMode.getOnline);
        window.addEventListener('offline', Engine.manager.OfflineMode.getOffline);

        if( navigator.onLine == false ){
            Engine.manager.OfflineMode.getOffline();
        }
    },

    showMsg: function(){
        Ext.Msg.alert("Oola!",
          "There is no internet connection." +
          " This app won't work well without it.",
          function(){
              if(Ext.manifest.toolkit == "classic") {
                  var max = Ext.ComponentQuery.query('loadmask').length;
                  Ext.ComponentQuery.query('loadmask')[max-1].hide();
              }else{
                  Ext.ComponentQuery.query('loadmask')[0].hide();
              }
          });
    },
    getOnline: function(){
        if(Ext.manifest.toolkit == "classic") {
            location.reload();
        }else{
            Ext.getStore('Artists').load();
            Ext.getStore('Albums').load();
            Ext.getStore('Recents').load();
        }

    },
    getOffline: function(){
        Engine.manager.OfflineMode.showMsg();
        //Ext.getStore('Artists').removeAll();
        //Ext.getStore('Albums').removeAll();
        //Ext.getStore('Recents').removeAll();
    }

});
