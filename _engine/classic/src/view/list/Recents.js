Ext.define('Engine.view.list.Recents', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.column.Date',
        //'Ext.grid.plugin.Exporter',
        'Ext.grid.plugin.Clipboard'
    ],
    alias: 'widget.recentgrid',

    ARTIST: 'Artist',
    DATE_FORMAT: 'M j Y, H:i',
    DATE_FORMAT_SMALL_DATE: 'M j',
    DATE_FORMAT_SMALL_TIME: 'H:i',
    LAST_PLAYED: 'Played',
    PLAYS: 'Plays',
    TRACK: 'Track',

    //bind: {
    //    store: '{recents}'
    //},
    store: {
      type: 'recents'
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
                dataIndex: 'artistname',
                text: this.ARTIST,
                sortable: false
            }, {
                flex: 1,
                dataIndex: 'name',
                text: this.TRACK,
                sortable: false
            }, {
                width: 100,
                xtype: 'datecolumn',
                format: this.DATE_FORMAT,
                dataIndex: 'lastplayed',
                text: this.LAST_PLAYED,
                align: 'right',
                sortable: false,
                renderer : function(value, tdInfo, record){
                    var date = new Date(record.get('lastplayed')),
                        today = new Date(),
                        me = this;

                    if(date.getDate() == today.getDate()
                        && date.getMonth() == today.getMonth()
                        && date.getFullYear() == today.getFullYear()){
                        //the date is today
                        //so we will change the format
                        date = Ext.util.Format.date(date, me.DATE_FORMAT_SMALL_TIME);
                    } else {
                        date = Ext.util.Format.date(date, me.DATE_FORMAT_SMALL_DATE);
                    }

                    return date;
                }
            }]
        });
        this.callParent(arguments);
    }
});
