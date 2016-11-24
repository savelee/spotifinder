Ext.define('Engine.utils.Constants', {
    singleton: true,

    APP_TITLE: 'Spotifinder <small>(v1.7)</small>',

    IS_SPOTIFY: true,
    IS_YOUTUBE: true,
    HAS_ADDS: true,
    PERIOD: "overall",
    SPOTIFYAPP: true,

}, function(){
    if(location.search.match(/\btestmode\b/)){
        Ext.manifest.constants.mock = true;
    }
    if(Ext.manifest.constants.mock){
        this.APP_TITLE = 'Spotifinder <small>(v1.7)</small> - MOCK MODUS';
    }
});
