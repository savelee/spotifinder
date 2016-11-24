Ext.define('Engine.view.detail.Detail', {
   extend: 'Ext.panel.Panel',

    xtype: 'detailpanel',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.VBox',
        'Ext.panel.Panel'
    ],

    ARTIST: "Artist",
    ALBUM: "Album",
    TRACK: "Track",
    LAST_PLAYED: "Last Played",
    PLAYCOUNT: "Playcount",
    PLAY_IN_SPOTIFY: "Play in Spotify",
    PLAY_IN_YOUTUBE: "Play in YouTube",
    OPEN_IN_LASTFM: "Open in LastFm",
    ERROR_HEADER: "Oops",
    ERROR_MSG_YOUTUBE_UNKNOWN: "Unknown error with YouTube. Unfortunately we can't find it.",
    ERROR_MSG_SPOTIFY_UNKNOWN: "Unknown error with Spotify. Unfortunately we can't find it.",
    LOADING_MSG_YOUTUBE: "Requesting data in YouTube...",
    LOADING_MSG_SPOTIFY: "Requesting data in Spotify...",

    bodyPadding: 10,

    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'top'
    },

    initComponent: function(config) {
        var items = [],
            me = this;

        items = [
        {
            xtype: 'button',
            ui: 'round',
            margin: 5,
            scale: 'medium',
            glyph: '88@Spotifinder',
            handler: 'onPlay',
            text: me.PLAY_IN_SPOTIFY
        },

        /*{  xtype: 'button',
            ui: 'gray',
            margin: 5,
            glyph: '51@Spotifinder',
            handler: 'openYouTube',
            text: me.PLAY_IN_YOUTUBE
        },

            {
            xtype: 'button',
            margin: 5,
            ui: 'gray',
            glyph: '87@Spotifinder',
            handler: 'openLastFm',
            text: me.OPEN_IN_LASTFM
        }, */
            {
            xtype: 'panel',
            flex: 1,
            margin: 10,

            bind: {
                data: '{mygrid.selection}'
            },
            tpl: ['<tpl if="this.isData(values)">',
                '<div class="detailpanel">',
                '<dl>',
                //it's a track
                '<tpl if="values.lastplayed">',
                '<tpl if="artistimage"><div class="holder"><img class="cover" src="{artistimage}" /></div></tpl>',
                '<dt>' + this.ARTIST + ':</dt><dd>{artistname}</dd>',
                '<dt>' + this.ALBUM + ':</dt><dd>{albumname}</dd>',
                '<dt>' + this.TRACK + ':</dt><dd>{name}</dd>',
                '<dt>' + this.LAST_PLAYED + ':</dt><dd>{lastplayed}</dd>',
                //it's an album
                '<tpl elseif="values.artistname">',
                '<tpl if="artistimage"><div class="holder"><img class="cover" src="{artistimage}" /></div></tpl>',
                '<dt>' + this.ARTIST + ':</dt><dd>{artistname}</dd>',
                '<dt>' + this.ALBUM + ':</dt><dd>{name}</dd>',
                '<dt>' + this.PLAYCOUNT + ':</dt><dd>{playcount}</dd>',
                //it's an artist
                '<tpl else>',
                '<tpl if="artistimage"><div class="holderartist"><img class="artistimg" src="{artistimage}" /></div></tpl>',
                '<dt>' + this.ARTIST + ':</dt><dd>{name}</dd>',
                '<dt>' + this.PLAYCOUNT + ':</dt><dd>{playcount}</dd>',
                '</tpl>',
                '</dl>',
                '</div></tpl>', {
                    isData: function(data) {
                        return !Ext.Object.isEmpty(data);
                    }
                }
            ]
        }];

        Ext.apply(me, {
           items: items
        });

        me.callParent(arguments);
    }

});