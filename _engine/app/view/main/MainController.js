/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 */
Ext.define('Engine.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.LoadMask'
    ],

    routes: {
    	'!:id': 'processRoute'
    },

    onDevTools: function(){
        win.webContents.openDevTools();
    },
    onQuit: function(){

    },
    onAbout: function(){

    },
    onHelp: function(){

    },
    onLastFMRegister: function(){

    },
    onDownloadSpotify: function(){

    },


    initViewModel: function(){
        var me = this,
        	vm = this.getViewModel(),
            u = "",
            su = "";

        try {
            Engine.manager.Settings.requestUserName().then(function(records){

                if(records){
                    u = records[0].getData().username;
                    su = records[0].getData().spotifyusername;

                    p = Ext.create('Ext.data.Model',{
                    	value: records[0].getData().period
                    });

                    me.getViewModel().set('username', u);
                    me.getViewModel().set('spotifyusername', su);
                    me.getViewModel().set('period', p);
                } else {

                    if(Ext.manifest.toolkit == "classic"){
                        Ext.Msg.alert("Attention!", "This application requires a valid lastfm username.");
                    } else {
                        alert("This application requires a valid lastfm username.");
                    }

                }

                me.requestData(u, 'overall');

            }, function(error){
                //TODO translate
                Ext.Msg.alert("Oops", error);
            });
        } catch(e){
            //<debug>
            console.log(e);
            //</debug>
        }
    },

    requestData: function(u,p){
        var artists = Ext.getStore('Artists'),
          albums = Ext.getStore('Albums'),
          recents = Ext.getStore('Recents');

        if(u) {
            Ext.merge(artists.getProxy(), {
                userName: u,
                period: p
            });
            Ext.merge(albums.getProxy(), {
                userName: u,
                period: p
            });
            Ext.merge(recents.getProxy(), {
                userName: u,
                period: p
            });

            artists.load();
            albums.load();
            recents.load();

        } else {
            //<debug>
            console.error("No username?", u);
            //</debug>

            if(Ext.manifest.toolkit === "classic") {
                this.lookupReference('lastFmUsername').validate();
            }
        }
    },

    execYouTube: function(record){
        var me = this,
            data = null,
            stripQuotes = function(val){
                var val = val.replace(/'/g, "");
                val = val.replace(/&/g, "and");

                return val;
            };

        if(record.lastplayed){
            //it's a track
            data = stripQuotes(record.artistname + " " + record.name);
        } else {
            //it's an artist or album
            data = stripQuotes(record.name);
        }

        Engine.manager.YouTube.getYouTubeSearch(data, me.doneFnYoutube);
    },

    //callback
    doneFnYoutube: function(result){
        var view = Ext.ComponentQuery.query('app-main')[0];

        if(result.result){
            //<debug>
            console.info(result.result);
            //</debug>
            Engine.manager.YouTube.playSearch(result.record.url);
        } else {

            /*Ext.Msg.show({
               title: view.ERROR_HEADER,
               message: view.ERROR_MSG_YOUTUBE_UNKNOWN,
               buttons: Ext.MessageBox.OK,
               icon: Ext.MessageBox.ERROR
           });*/

           Ext.Msg.alert(view.ERROR_HEADER, view.ERROR_MSG_YOUTUBE_UNKNOWN);
            //<debug>
            console.error(result.msg);
            //</debug>
        }

        view.myMask.hide();
    },

    onPlay: function (button) {
        var rec = null,
            me = this,
            selection = me.getViewModel().get('mygrid').selection;

        if(selection){
            rec = selection.getData();
        } else {
            return false;
        }

        me.getView().myMask = new Ext.LoadMask({
            target: me.getView(),
            msg: me.getView().LOADING_MSG_SPOTIFY
        });
        me.getView().myMask.show();

        Engine.manager.Spotify.execSpotify(rec, me.doneFnSpotify);
    },

    doneFnSpotify: function(result){
        var view = Ext.ComponentQuery.query('app-main')[0];

        if(result.result){
            //<debug>
            console.info(result);
            //</debug>
            Engine.manager.Spotify.play(result);
        } else {
            var msg;
            if(result.msg){
                msg = result.msg;
            } else {
                msg = view.ERROR_MSG_SPOTIFY_UNKNOWN
            }

            /*Ext.Msg.show({
               title: view.ERROR_HEADER,
               message: msg,
               buttons: Ext.MessageBox.OK,
               icon: Ext.MessageBox.ERROR
            });*/

            Ext.Msg.alert("Oops", msg);

            //<debug>
            console.error(result.msg);
            //</debug>
        }
        view.myMask.hide();
    },

    openYouTube: function(button){
        var rec = null;
        var selection = this.getViewModel().get('mygrid').selection;
        if(selection){
            rec = selection.getData();
        } else {
            return false;
        }

        this.getView().myMask = new Ext.LoadMask({
            target: this.getView(),
            msg: this.getView().LOADING_MSG_YOUTUBE
        });

        this.getView().myMask.show();
        this.execYouTube(rec);
    },
    openLastFm: function(button){
        var selection = this.getViewModel().get('mygrid').selection;
        if(selection){
            rec = selection.getData();
        } else {
            return false;
        }

        window.open(rec.url);
    },

    processRoute: function(id){
    	var main;

    	if(id.split('-')[0] == "tab"){
    		main = this.getView().down('interface');
    	} else if(id.split('-')[0] == "btn"){
    		main = this.getView();
    	}

    	if(Ext.manifest.toolkit === "classic") {
    		main.getLayout().setActiveItem(id);
    	} else {

    		if(id.split('-')[0] == "tab"){
    			var item = this.getView().down('#'+id);
    			main.setActiveItem(item);

                var active = main.getActiveItem();
                var activeTabIndex = main.items.indexOf(active);
                var i = activeTabIndex - 2;
                main.down('segmentedbutton').setValue(i);

                this.getView().pop();
    		}
    	}
    }
});
