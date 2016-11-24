Ext.define('Engine.view.tabpanel.Panel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.interface',
    requires: [
        'Ext.TitleBar',
        'Ext.SegmentedButton',
        'Ext.plugin.ListPaging',
        //'SenchaCandyShared.plugin.ScrollableListItem',
        'Ext.Carousel'
    ],

    layout: {
      type: 'card',
      animation: {
      	type: 'fade'
      	//,direction: 'left'
      }
    },

    arr: null,

    defaults: {
        styleHtmlContent: true,
        iconAlign: 'left'
    },

    tabBarPosition: 'top',
    listeners: {
    	'activeitemchange': 'onTabChange'
    },

    config: {
      toolbarItems: [{
          xtype: 'component',
          cls: 'emptyholder',
          width: 35
        },
        '->',
        {
          xtype: 'segmentedbutton',
          defaults: {
            width: 70
          },
          items: [{
            text: 'Artist',
            handler: 'onArtists',
            pressed: true
          }, {
            text: 'Albums',
            handler: 'onAlbums'
          }, {
            text: 'Recents',
            handler: 'onRecents'
          }]
        },
        '->',
        {
            xtype: 'button',
            align: 'right',
            iconCls: 'x-fa fa-cog',
            //itemId: 'btn-settings',
            //cls: 'settingsbutton',
            //cls: 'settingsbutton',
            handler: 'onSettingsBtn'
        }]
    },

    items: [
        {
            xtype: 'toolbar',
            docked: 'top'
        },
        {
            xtype: 'button',
            docked: 'bottom',
            margin: 2,
            disabled: true,
            disabledCls: 'disabled',
            cls: 'playbutton',
            ui: 'confirm',
            handler: 'onPlay',
            text: 'Play in Spotify',
            handler: 'onPlay'
        },
        {
            title: 'Artists',
            layout: 'fit',
            itemId: 'tab-artists',
            xtype: 'list',
            reference: 'mygrid',
            grouped: true,
            pinHeaders: true,
            indexBar: true,
            itemTpl: '<div class="holder"><tpl if="artistimagesmall"><div class="image"><img src="{artistimagesmall}" /></div></tpl><span class="musictitle singletitle">{name:ellipsis(30)}</span></div>',
            store: {
              type: 'artists',
              grouper: {
                groupFn: function(rec){
                  return rec.get('name')[0].toUpperCase();
                }
              }
            },
            /*plugins: [{
               xclass: 'Ext.plugin.ListPaging',
               autoPaging: true
             },{
              xclass: 'SenchaCandyShared.plugin.ScrollableListItem',
              direction: 'top',
              component: {
                xtype: 'carousel',
                height: 200,
                flex: 1
              }
          }],*/
           listeners: {
             selectionchange: 'onSelection'
           }
        },
        {
            title: 'Albums',
            itemId: 'tab-albums',
            layout: 'fit',
            xtype: 'list',
            reference: 'mygrid',
            grouped: true,
            pinHeaders: true,
            indexBar: true,
            itemTpl: '<div class="holder"><tpl if="artistimagesmall"><div class="image"><img src="{artistimagesmall}" /></div></tpl><span class="musictitle">{name:ellipsis(30)}</span><span class="artist">{artistname:ellipsis(60)}</span></div>',
            store: {
              type: 'albums',
              grouper: {
                groupFn: function(rec){
                  return rec.get('name')[0].toUpperCase();
                }
              }
            },
            plugins: [{
                   xclass: 'Ext.plugin.ListPaging',
                   autoPaging: true
               }
           ],
           listeners: {
             selectionchange: 'onSelection'
           }
        },{
            title: 'Recents',
            itemId: 'tab-recents',
            layout: 'fit',
            xtype: 'list',
            reference: 'mygrid',
            grouped: true,
            itemTpl: '<div class="holder"><tpl if="artistimagesmall"><div class="image"><img src="{artistimagesmall}" /></div></tpl><span class="musictitle">{name:ellipsis(30)}</span><span class="artist">{lastplayed:date("j M H:i")}</span> &middot; <span class="artist">{artistname:ellipsis(30)}</span></div>',
            store: {
              type: 'recents'
            },
            plugins: [{
                   xclass: 'Ext.plugin.ListPaging',
                   autoPaging: true
               }
           ],
           listeners: {
             selectionchange: 'onSelection'
           }
      }],

      initialize: function(){
        var me = this;
        me.callParent(arguments);
        me.getItems().getAt(0).addCls('toptoolbar');
        me.getItems().getAt(0).add(me.getToolbarItems());
      }
});
