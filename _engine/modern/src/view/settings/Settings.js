Ext.define('Engine.view.settings.Settings', {
    extend: 'Ext.form.Panel',
    alias: 'widget.settings',

    requires: [
        'Ext.Label',
        'Ext.field.Text',
        'Ext.plugin.field.PlaceHolderLabel'
    ],

    reference: 'mysettingspanel',

    SETTINGS: 'Settings',
    NAME: 'Name',
    MY_USERNAME: 'lastfm username',
    OPEN_SPOTIFY_APP: 'Spotify',
    OPEN_SPOTIFY_WEB: 'Web App',
    PLAYER: 'Open in',
    OVERALL: 'overall',
    WEEK: 'of the week',
    MONTH: 'of the month',
    MONTH3: 'of the last 3 months',
    MONTH6: 'of the last 6 months',
    YEAR: 'of the year',
    FAV_MUSIC: 'Timeframe',
    ADVANCED_SETTINGS: 'Advanced Settings',
    LASTFM_APIKEY: 'LastFm Api Key',
    LASTFM_APISECRET: 'LastFm Api Secret',
    SAVE: 'Save',
    CANCEL: 'Cancel',
    BACK: 'Back',
    WELCOME_TEXT: '<h1>Welcome to Spotifinder.</h1><p>A great way to play your Last.fm playlists with one button press in Spotify!</p><p>Spotifinder requires Spotify to be installed on your device. You will need an internet connection to retrieve all your songs. </p><p>Enter your Last.fm account name to fetch all the data, and directly play in Spotify.</p>',

    config: {
        fullscreen: 'true',
        items: null,
        titleBar: null
    },

    initialize: function() {
        var me = this;
        me.callParent(arguments);

        var titleBar = me.getMyTitleBar();
        var nameField = me.getNameField();

        var items = [
            titleBar, {
                xtype: 'component',
                styleHtmlContent: true,
                styleHtmlCls: 'settingsinfo',
                html: me.WELCOME_TEXT
            }, {
                xtype: 'fieldset',
                title: 'Last.fm details',
                items: [
                nameField,
                {
                    xtype: 'selectfield',
                    label: me.FAV_MUSIC,
                    usePicker: true,
                    labelAlign: 'left',
                    labelWidth: '120',
                    options: [{
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
                    }],

                    displayField: 'value',
                    valueField: 'value',

                    name: 'period',
                    bind: {
                        selection: '{period}',
                        value: '{period}'
                    },

                    listeners: {
                        afterrender: 'onLastFmPeriod'
                    }
                }]
            }, {
                xtype: 'button',
                ui: 'confirm',
                text: me.SAVE,
                handler: 'onSave'
            }
        ];

        me.setItems(items);
    },
    getNameField: function(){
        var me = this;
        var nameField =  {
            xtype: 'textfield',
            stateful: true,
            stateId: 'spotifinder-username',
            labelAlign: 'left',
            label: me.NAME,
            name: 'name',
            placeHolder: me.MY_USERNAME,
            reference: 'lastFmUsername',
            //publishes: ['value'],
            bind: {
                value: '{username}'
            },
            listeners: {
                'blur': 'onBlur',
                'change': 'onChange' //this.fireEvent('onAlbumClick')
            }
        };
        if (
            Ext.platformTags.android != 0 ||
            Ext.manifest.theme == "theme-spotidroid"
        ) {
            nameField.plugins = [{
                type : 'placeholderlabel'
            }];
        }

        return nameField;
    },
    getMyTitleBar: function() {
        var me = this,
            backbutton, titleBar;
        if (Ext.platformTags.android == 0) {
            //no back button
            //or when running on desktop, different look
            backbutton = {
                xtype: 'button',
                ui: 'back',
                text: me.BACK,
                handler: function(button) {
                    button.up('app-main').pop();
                }
            };

            if (Ext.manifest.theme == "theme-spotidroid") {
                backbutton = {
                    xtype: 'button',
                    iconCls: 'back',
                    align: 'right',
                    handler: function(button) {
                        button.up('app-main').pop();
                    }
                };
            }

            titleBar = {
                xtype: 'titlebar',
                docked: 'top',
                title: me.SETTINGS,
                items: [backbutton]
            };
        } else {
            titleBar = {
                xtype: 'titlebar',
                docked: 'top',
                title: me.SETTINGS
            };
        }

        return titleBar;
    }
});
