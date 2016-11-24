Ext.define("Engine.view.settings.Settings", {
    extend: "Ext.form.Panel",
    xtype: 'settingspanel',

    requires: [
        'Ext.layout.container.Form',
        'Ext.form.field.Text'
        //,'SenchaCandy.form.field.ToggleButton'
    ],

    SETTINGS: 'Settings',
    NAME: 'Name',
    MY_USERNAME: 'LastFM username',
    MY_SPOTIFY_NAME: 'Spotify username',
    OPEN_SPOTIFY_APP: 'Spotify',
    OPEN_SPOTIFY_WEB: 'Web App',
    PLAYER: 'Open in',
    OVERALL: 'overall',
    WEEK: 'of the week',
    MONTH: 'of the month',
    MONTH3: 'of the last 3 months',
    MONTH6: 'of the last 6 months',
    YEAR: 'of the year',
    FAV_MUSIC: 'Favorite music',
    ADVANCED_SETTINGS: 'Advanced Settings',
    LASTFM_APIKEY: 'LastFm Api Key',
    LASTFM_APISECRET: 'LastFm Api Secret',
    SAVE: 'Save',
    CANCEL: 'Cancel',
    TOOLTIP_PERIOD_TITLE: 'Period',
    TOOLTIP_PERIOD: 'The time period over which to retrieve top artists for.',
    TOOLTIP_APIKEY_TITLE: 'Api Key',
    TOOLTIP_APIKEY: 'Do you have your own LastFM developer account? Please provide your API key. http://www.last.fm/api/',
    TOOLTIP_APISECRET_TITLE: 'Api Secret',
    TOOLTIP_APISECRET: 'Do you have your own LastFM developer account? Please provide your API secret. http://www.last.fm/api/',

    reference: 'settingsform',

    initComponent: function(config) {

        var me = this, items = [
        {
            xtype: 'textfield',
            stateful: true,
            stateId: 'spotifinder-username',
            itemId: 'spotifinder-username',
            labelAlign: 'top',
            fieldLabel: me.MY_USERNAME,
            name: 'name',
            emptyText: me.MY_USERNAME,
            bind: {
                value: '{username}'
            },
            reference: 'lastFmUsername', //this.lookupReference('lastFmUsername')
            allowBlank: false,
            publishes: ['value']
        },
        /*{
            xtype: 'textfield',
            stateful: true,
            stateId: 'spotifinder-s-username',
            itemId: 'spotifinder-s-username',
            labelAlign: 'top',
            fieldLabel: me.MY_SPOTIFY_NAME,
            name: 'spotifyname',
            emptyText: me.MY_SPOTIFY_NAME,
            bind: {
                value: '{spotifyusername}'
            },
            reference: 'spotifyUsername', //this.lookupReference('lastFmUsername')
            allowBlank: false,
            publishes: ['value']
        },*/
        ,{
            xtype: 'combo',
            fieldLabel: me.FAV_MUSIC,
            itemId: 'fav-music-combo',
            bind: {
                //selection: '{period}',
                value: '{period}'
            },
            labelAlign: 'top',
            store: Ext.create('Ext.data.Store', {
                fields: ['value'],
                data: [{
                    "value": "overall"
                }, {
                    "value": "7day"
                }, {
                    "value": "1month"
                }, {
                    "value": "3month"
                }, {
                    "value": "6month"
                }, {
                    "value": "12month"
                }]
            }),
            queryMode: 'local',
            displayField: 'value',
            valueField: 'value',

            name: 'period'

            /*,triggers: {
                tip: {
                    cls: 'question'
                }
            }*/
        }];

        if (Engine.utils.Constants.IS_SPOTIFY) {
            /*items.push({
                xtype: 'sctogglebutton',
                fieldLabel: this.PLAYER,
                inputValue: '1',
                onText: me.OPEN_SPOTIFY_APP,
                offText: me.OPEN_SPOTIFY_WEB,
                checked: 1,
                name: 'openinspotifyapp',
                reference: 'lastFmAppView',
                publishes: ['checked']
                /*stateful: true,
                stateId: 'spotifinder-openinspotifyapp',
                stateEvents: ['change'],
                getState: function() {
                    return {
                        checked: this.getValue()
                    };
                },
                applyState: function(state) {
                    this.setValue(state && state.checked);
                }
            });*/
        };

        items.push({
            xtype: 'button',
            text: me.SAVE,
            ui: 'round',
            formBind: true,
            disabled: true,
            itemId: 'savebutton',
            flex: 1,
            handler: 'onSave',
            margin: '10 20'
        });

        Ext.apply(me, {
            items: [{
                xtype: 'fieldset',
                layout: {
                    type: 'fit'
                },
                defaults: {
                    labelWidth: 110,
                    padding: 10,
                    height: 25,
                    margin: 5
                },
                padding: 10,
                items: items
            }]
        });
        me.callParent(arguments);
    }
});
