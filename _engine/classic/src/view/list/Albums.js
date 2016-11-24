Ext.define('Engine.view.list.Albums', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.albumgrid',

    requires: [
        'Engine.store.Albums',
        //'Ext.grid.plugin.Exporter',
        'Ext.grid.plugin.Clipboard'
    ],

    ARTIST: 'Artist',
    ALBUM: 'Album',
    PLAYS: 'Plays',

    store: {
      type: 'albums'
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


    initComponent: function(config){
        Ext.apply(this, {
            columns: [{
                flex: 1,
                dataIndex: 'artistname',
                text: this.ARTIST,
                sortable: false
            },{
                flex: 1,
                dataIndex: 'name',
                text: this.ALBUM,
                sortable: false
            },{
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
