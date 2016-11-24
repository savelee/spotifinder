Ext.define('Engine.view.list.Artists', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.column.Number',
        //'Ext.grid.plugin.Exporter',
        'Ext.grid.plugin.Clipboard'
    ],
    alias: 'widget.artistgrid',

    ARTIST: 'Artist',
    PLAYS: 'Plays',

    //bind: {
    //    store: '{artists}'
    //},
    store: {
      type: 'artists'
    },
    reference: 'mygrid',

    deferredRender:false,
    plugins: [{
        ptype: 'clipboard'
    },
    //{
    //    ptype: 'gridexporter'
    //}
    ],

    initComponent: function(config) {
        Ext.apply(this, {
            columns: [{
                flex: 1,
                dataIndex: 'name',
                text: this.ARTIST,
                sortable: false
            }, {
                xtype: 'numbercolumn',
                format: '0',
                align: 'right',
                width: 100,
                dataIndex: 'playcount',
                text: this.PLAYS,
                sortable: false
            }]
        });
        this.callParent(arguments);
    }
});
