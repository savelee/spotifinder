Ext.define('Engine.view.main.MainControllerModern', {
    extend: 'Engine.view.main.MainController',

    alias: 'controller.main',

    onArtists: function(){
    	this.getView().down('interface').setActiveItem(0);
    },
    onAlbums: function(){
    	this.getView().down('interface').setActiveItem(1);
    },
    onRecents: function(){
    	this.getView().down('interface').setActiveItem(2);
    },

    onPop: function(){
      var tab = this.getView().down('interface').setActiveItem(0);
      this.getView().fireEvent('routechange', tab.down('#tab-artists'));
    },

    onLastFmPeriod: function() {
        var me = this,
        	p = me.getView().down('selectfield').getValue(),
            vm = me.getViewModel();

       vm.set('period', p);

       //<debug>
       console.log('TODO');
       //</debug>
    },

    onSettingsBtn: function(btn){
        this.getView().fireEvent('routechange', '!settings');

        this.getView().push({
            xtype: 'settings'
        });
    },
    onTabChange: function(tabpanel, tab){
    	this.getView().fireEvent('routechange', tab);
    },

    onBlur: function(field){
    	if(!field.getValue()) {
    		field.addCls('invalid-field');
        }
    },
    onChange: function(field, value){
    	if(value) field.removeCls('invalid-field');
    },
    onSelection: function(list, recs){
        if(recs){
          this.getView().down('button').enable();
        } else {
          this.getView().down('button').disable();
        }
    },
    onSave: function(button, e){
        var me = this,
            vm = me.getViewModel(),
            u = vm.getData().username,
            p = vm.getData().period,
            settings = null;

        settings = {
            username: u,
            period: p.getData().value,
            openInApp: true
        };

        /* note, the username and period was bound, so its already in the vm. */
        /* but you also want to store it in the localstorage */
        Engine.manager.Settings.saveSettings(settings).then(function(response){
            me.requestData(u,p);
        });
    }
});
