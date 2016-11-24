Ext.define('Settings', {
  override: 'Engine.view.settings.Settings',

  titleBar: {
      xtype: 'titlebar',
      docked: 'top',
      titleAlign: 'left',
      title: 'Settings',
      items: [{
          xtype: 'button',
          iconCls: 'icon-close',

          align: 'right',
          handler: function(button){
              button.up('app-main').pop();
          }
      }]
  },
  listeners: {
    "backbutton": function(){
      //TODO
    }
  }
});
