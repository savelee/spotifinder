Ext.define('Engine.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Engine.view.detail.Detail',
        'Engine.view.main.MainModel',
        'Engine.view.main.MainControllerClassic',
        'Engine.view.menu.MainMenu',
        'Engine.view.tabpanel.Panel',
        'Engine.utils.Constants',
        'Ext.Component',
        'Ext.layout.container.Border',
        'Ext.layout.container.VBox',
        'Ext.state.LocalStorageProvider',
        'Ext.plugin.Viewport'
    ],

    mixins: [
        'Ext.electron.menu.Manager'
    ],

    controller: 'main',
    viewModel: 'main',
    layout: 'border',

    LOADING_MSG_YOUTUBE: "Requesting data in YouTube...",
    LOADING_MSG_SPOTIFY: "Requesting data in Spotify...",
    ERROR_HEADER: "Oops",
    ERROR_MSG_YOUTUBE_UNKNOWN: "Unknown error with YouTube. Unfortunately we can't find it.",
    ERROR_MSG_SPOTIFY_UNKNOWN: "Unknown error with Spotify. Unfortunately we can't find it.",

    items: [{
        region: 'west',
        split: true,
        flex: 0.35,
        maxWidth: 250,
        collapsible: true,
        titleCollapse : true,
        title: 'Menu',
        xtype: 'mainmenu'
    }, {
        region: 'east',
        title: 'Details',
        width: 340,
        xtype: 'detailpanel'
    }, {
        region: 'center',
        layout: {
            type: 'vbox',
            pack: 'center',
            align: 'stretch'
        },
        items: [{
            xtype: 'image',
            src: 'classic/resources/header-image.jpg',
            cls: 'headerimage',
            height: 150
        }, {
            xtype: 'interface',
            flex: 1
        }]
    }],
    
    nativeMenus: {
        app: [{
            submenu: [
            {
                label: 'About',
                click: 'onAbout'
            },
            {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+Q',
                click: 'onQuit'
            }]
        },{
            label: 'Help',
            submenu: [{
                label: 'Help',
                accelerator: 'CmdOrCtrl+H',
                click: 'onHelp'
            }]
        }]
    }
}, function(){
    console.log("load")
});
