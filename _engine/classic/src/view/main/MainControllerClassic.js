Ext.define('Engine.view.main.MainControllerClassic', {
    extend: 'Engine.view.main.MainController',

    alias: 'controller.main',

    requires: [
        'Engine.manager.Settings',
        'Ext.tip.QuickTipManager'
    ],

    routes: {
    	'!:id': 'processRoute'
    },

    beforeInit: function(){
        Ext.tip.QuickTipManager.init();
    },

    onTabChange: function(tabpanel, tab){
    	this.getView().fireEvent('routechange', tab);
    },

    //Export demo
    onExport: function(button, e){
        if(button.getText() == "Export Artists (Excel)"){
            Ext.ComponentQuery.query('interface')[0].setActiveItem(0);
            Ext.ComponentQuery.query('artistgrid')[0].saveDocumentAs({
                title:      'Spotifinder Artists',
                fileName:   'artists.xlsx',
                type: 'xlsx'
            });
        }
        if(button.getText() == "Export Albums (CSV)"){
            Ext.ComponentQuery.query('interface')[0].setActiveItem(1);
            Ext.ComponentQuery.query('albumgrid')[0].saveDocumentAs({
                title:      'Spotifinder Albums',
                fileName:   'albums.csv',
                type: 'csv'
            });

        }
        if(button.getText() == "Export Tracks (HTML)"){
            Ext.ComponentQuery.query('interface')[0].setActiveItem(2);
            Ext.ComponentQuery.query('recentgrid')[0].saveDocumentAs({
                title:      'Spotifinder Tracks',
                fileName:   'tracks.html',
                type: 'html'
            });
        }

    },

    //promises
    onSave: function(button, e){
        var me = this,
            vm = me.getViewModel(),
            u = vm.getData().username,
            p = vm.getData().period,
            settings = null;

        if(p instanceof Object){
            p = p.data.value;
        }

        settings = {
            username: u,
            period: p,
            openInApp: true
        };
        /* note, the username and period was bound, so its already in the vm. */
        /* but you also want to store it in the localstorage */
        Engine.manager.Settings.saveSettings(settings).then(function(response){
            me.requestData(u,p); //in MainController.js
        }, function(e){
            //<debug>
            console.log(e);
            //</debug>
        });
    },

    //desktop app only
    init () {
        if(window.process){
            this.getView().reloadNativeMenu('app');  
        }
    }
});
