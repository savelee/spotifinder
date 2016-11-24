Ext.define('TabPanel', {
  override: 'Engine.view.tabpanel.Panel',

  toolbarItems: [{
    xtype: 'segmentedbutton',
    flex: 1,
    defaults: {
      flex: 1
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
  {
      xtype: 'button',
      align: 'right',
      iconCls: 'x-fa fa-cog',
      //itemId: 'btn-settings',
      //iconCls: 'icon-colon',
      cls: 'androidsettingsbtn',
      handler: 'onSettingsBtn'
  }],

  initialize: function(){
    var me = this;
    me.callParent(arguments);
    me.getItems().getAt(0).setItems(me.toolbarItems);
  }
});
