Ext.define('Engine.manager.Spotify', {
  singleton: true,

  ONE_RESULT: '1 result found.',
  MULTPLE_RESULT: 'Multiple results found.',
  NO_RESULT: "Unfortunately we can't find this in Spotify.",
  NO_CONNECTION: "Unfortunately there is no internet connection. This app should be online in order to use it. Please try again later.",

  requires: [
    'Ext.data.JsonP',
    'Engine.utils.Constants'
  ],

  spotifyApiKey : null,
  spotifyApi: null,
  returnUrl: null,
  isMock: false,

  initUnitTest: function() {
    return true;
  },

  authorize: function(){
    var me = thisl
    var url = 'https://accounts.spotify.com/en/authorize?client_id=' +
       me.spotifyApiKey +
      '&redirect_uri=' +
       me.returnUrl +
      '&response_type=code&scope=user-read-email%20user-library-modify';

    window.location.href = url;
    //window.open(url);
  },

  //callback
  execSpotify: function(record, callback) {
    var me = this,
      data = null,
      stripQuotes = function(val) {
        var val = val.replace(/'/g, "");
        val = val.replace(/&/g, "and");

        return val;
      };

    if (record.lastplayed) {
      //it's a track
      data = stripQuotes(record.artistname + " " + record.name);
      me.getSpotifyTrack(data, callback);
    } else if (record.artistname) {
      //it's an album
      data = stripQuotes(record.artistname + " " + record.name);
      me.getSpotifyAlbum(data, callback);
    } else {
      //it's an artist
      if (record.name) {
        data = stripQuotes(record.name);
        me.getSpotifyArtist(data, callback);
      }
    }
  },

  retrieveSpotifyPlaylists: function(username){
    var me = this;
    Ext.data.JsonP.request({
      url: me.spotifyApiKey + 'spotify-playlists.php',
      defaultHeaders: {
        'Accept': 'application/json'
      },
      params: {
        cType: ctype,
        q: query,
        timeout: '30000'
      },
      timeout: 60000,
      failure: function(error) {
        //<debug>
        console.log(error);
        //</debug>
      },
      success: function(){
        //<debug>
        console.log(arguments);
        //</debug>
      }
    });
  },

  makeSpotifyRequest: function(ctype, query, doneFnSpotify) {
    var result = null,
      me = this;

    //<debug>
    console.log(ctype + ": " + query);
    //</debug>

    if (navigator.onLine !== true) {
      //callback
      if (doneFnSpotify) doneFnSpotify({
        result: false,
        record: null,
        msg: me.NO_CONNECTION
      });
      return false;
    }

    Ext.data.JsonP.request({
      url: me.spotifyApi,
      defaultHeaders: {
        'Accept': 'application/javascript'
      },
      params: {
        cType: ctype,
        q: query,
        service: 'search',
        isMock: me.isMock
      },
      timeout: 600000,
      failure: function(error) {
        //<debug>
        console.log("OOPS");
        console.log(error);
        //</debug>
        if (doneFnSpotify) doneFnSpotify({
          result: false,
          record: null,
          msg: error
        });
      },
      success: function(response) {
        //console.log(response);
        var objPlay = null,
          msg = "";

        //<debug>
        console.log("spotify response:", response);
        //</debug>

        if (response.artists) {
          if (response.artists.items.length > 0) {
            var artist = response.artists.items[0];
            objPlay = {
              "id": artist.id,
              "name": artist.name,
              "type": artist.type,
              "uri": artist.uri
            }
            if (artist["external_urls"].spotify) {
              objPlay.web = artist["external_urls"].spotify;
            }
            //if(track["popularity"].spotify){
            //  objPlay.popularity = track["popularity"].spotify;
            //}
            //if(artist.genres){
            //  objPlay.genres = artist.genres;
            //}
            //if(artist.images){
            //  objPlay.images = artist.images;
            //}
          }

        }
        if (response.tracks) {
          if (response.tracks.items.length > 0) {
            var track = response.tracks.items[0];

            if (track.artists[0]) {
              var objArtist = null;
              objArtist = {
                "id": track.artists[0].id,
                "name": track.artists[0].name,
                "type": track.artists[0].type,
                "uri": track.artists[0].uri
              }
              if (track.artists[0]["external_urls"].spotify) {
                objArtist.web = track.artists[0]["external_urls"].spotify;
              }
            }

            objPlay = {
              "id": track.id,
              "name": track.name,
              "artist": objArtist,
              "type": track.type,
              "uri": track.uri
            }
            if (track["external_urls"].spotify) {
              objPlay.web = track["external_urls"].spotify;
            }
            //if(track["popularity"].spotify){
            //  objPlay.popularity = track["popularity"].spotify;
            //}
            //if(track.images){
            //  objPlay.images = track.images;
            //}
          }
        }
        if (response.albums) {
          if (response.albums.items.length > 0) {
            var album = response.albums.items[0];

            objPlay = {
              "id": album.id,
              "name": album.name,
              "type": album.type,
              "uri": album.uri
            }
            if (album["external_urls"].spotify) {
              objPlay.web = album["external_urls"].spotify;
            }
            //if(track.images){
            //  objPlay.images = track.images;
            //}
          }
        }

        //<debug>
        console.log("objPlay:", objPlay);
        //</debug>

        if(objPlay){
          if (doneFnSpotify) doneFnSpotify({
            result: true,
            record: objPlay,
            msg: msg
          });
        } else {
          if (doneFnSpotify) doneFnSpotify({
            result: false,
            record: null,
            msg: "Bummer, couldn't find the result in Spotify."
          });
        }
      }
    });
  },
  getSpotifyArtist: function(artist, callback) {
    if (artist)
      this.makeSpotifyRequest('artist', artist, callback);
  },
  getSpotifyAlbum: function(album, callback) {
    if (album)
      this.makeSpotifyRequest('album', album, callback);
  },
  getSpotifyTrack: function(track, callback) {
    if (track)
      this.makeSpotifyRequest('track', track, callback);
  },
  playInSpotify: function(result) {
    //<debug>
    console.log("spotify:" + result.record.uri);
    //</debug>
    document.location = result.record.uri;
    return true;
  },
  playInWebView: function(result) {
    //<debug>
    console.log("web:" + result.record.web);
    //</debug>

    //<debug>
    if (document.location.href.indexOf('test.html') == -1)
    //</debug>

    //if(window.navigator.standalone === true) {
    //    alert("here we need a phonegap hook");
    //   //window.location.href = 'https://play.spotify.com/'+links[1]+'/' + links[2];
    //}

      window.open(result.record.web, '_blank', 'location=no,EnableViewPortScale=yes');
    return true;
  },

  setOpenSpotifyInApp: function(newVal) {
    this.openSpotifyInApp = newVal;
  },
  getOpenSpotifyInApp: function() {
    var localValue = localStorage.getItem('ext-spotifinder-openinspotifyapp'),
      val;

    if (localValue) {
      val = localValue.split('o%3Achecked%3Db%253A')[1];
    } else {
      val = this.openSpotifyInApp;
    }
    return val;
  },
  play: function(result) {
    //TODO build this functionality
    //if(this.getOpenSpotifyInApp() == 0) {
    //this.playInWebView(result);
    //} else {
        this.playInSpotify(result);
    //}
  }
}, function(){
  this.openSpotifyInApp = Engine.utils.Constants.SPOTIFYAPP;
  this.spotifyApiKey = Ext.manifest.constants.spotify.key;
  this.returnUrl =  Ext.manifest.constants.spotify.return_url;
  this.spotifyApi = Ext.manifest.constants.spotify.url;
  this.isMock = Ext.manifest.constants.mock;
});
