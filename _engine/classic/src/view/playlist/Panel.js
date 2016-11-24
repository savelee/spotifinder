Ext.define("Engine.view.playlist.Panel",{
    extend: "Ext.tree.Panel",

    requires: [
        "Engine.view.playlist.PanelController",
        "Engine.view.playlist.PanelModel"
    ],

    xtype: 'playlist',
    controller: "playlist-panel",
    viewModel: {
        type: "playlist-panel"
    }
});
