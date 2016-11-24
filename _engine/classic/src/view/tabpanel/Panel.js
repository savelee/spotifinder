Ext.define('Engine.view.tabpanel.Panel', {
    extend: 'Ext.tab.Panel',

    requires: [
        'Engine.view.list.Albums',
        'Engine.view.list.Recents',
        'Engine.view.list.Artists'
    ],

    xtype: 'interface',

    ui: 'alternative',

    listeners: {
    	'tabchange': 'onTabChange'
    },

    items: [{
        title: 'Artists',
        itemId: 'tab-artists',
        xtype: 'artistgrid'
    }, {
        title: 'Albums',
        itemId: 'tab-albums',
        xtype: 'albumgrid'
    }, {
        title: 'Recent Tracks',
        itemId: 'tab-recents',
        xtype: 'recentgrid'
    }]
});