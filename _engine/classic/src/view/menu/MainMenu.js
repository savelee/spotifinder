Ext.define("Engine.view.menu.MainMenu",{
    extend: "Ext.panel.Panel",

    requires: [
        'Engine.view.playlist.Panel',
        'Engine.view.charts.LastChart',
        'Engine.view.settings.Settings'
    ],

    xtype: 'mainmenu',

    layout: {
        type: 'accordion'
    },
    items: [],

    initComponent: function(config) {
        var me = this;
        var items = [];

        items.push({
            title: 'Settings',
            cls: 'mainmenupanel',
            xtype: 'settingspanel'
        });

        //<debug>
        if(Engine.utils.Constants.IS_MOCK){
            items.push({
                xtype: 'panel',
                title: 'More',
                items: [{
                    xtype: 'button',
                    ui: 'round',
                    margin: '20 0 5 0',
                    text: 'Export Artists (Excel)',
                    handler: 'onExport'
                }, {
                    xtype: 'button',
                    ui: 'round',
                    margin: '5 0',
                    text: 'Export Albums (CSV)',
                    handler: 'onExport'
                }, {
                    xtype: 'button',
                    ui: 'round',
                    margin: '5 0',
                    text: 'Export Tracks (HTML)',
                    handler: 'onExport'
                }, {
                    xtype: 'button',
                    ui: 'round',
                    margin: '5 0',
                    text: 'Enable Charts',
                    handler: function(){
                        Ext.ComponentQuery.query('interface')[0].add({
                            xtype: 'lastcharts',
                            title: 'Charts'
                        });
                        Ext.ComponentQuery.query('interface')[0].setActiveItem(3);
                        this.disable();

                    }
                }]
            });
        }
        //</debug>
        Ext.apply(me, {
            items: items
        });
        me.callParent(arguments);
    }
});
