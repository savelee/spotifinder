Ext.define('Engine.model.Setting', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.validator.Presence',
        'Ext.data.validator.Inclusion',
        'Ext.data.proxy.LocalStorage'
    ],

    fields: [
    	{
    		name: 'username',
    		type: 'string'
    	},
      {
        name: 'spotifyusername',
        type: 'string'
      },
      {
          name: 'period',
          type: 'string',
          defaultValue: 'overall'
      }, {
          name: 'openInApp',
          type: 'boolean',
          defaultValue: true
      }
    ],

    proxy: {
        type: 'localstorage',
        id: 'Setting'
    },

    validators: {
        username: 'presence',
        period: {
            type: 'inclusion',
            list: [
                'overall','7day','1month','3month','6month','12month'
            ]
        }
    }

});
