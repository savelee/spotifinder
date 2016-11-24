Ext.define('Engine.manager.YouTube', {
    //extend: 'Ext.app.Controller',
    singleton: true,

    requires: [
        'Ext.data.JsonP',
        'Engine.utils.Constants'
    ],

    ONE_RESULT: '1 result found.',
    MULTPLE_RESULT: 'Multiple results found.',
    NO_RESULT: "Unfortunately we can't find this in YouTube.",
    NO_CONNECTION: "Unfortunately there is no internet connection. This app should be online in order to use it. Please try again later.",

    initUnitTest: function() {
        return "ok";
    },

    makeYqlRequest: function(query, callback) {
        var url = 'https://query.yahooapis.com/v1/public/yql?q=' + query +
            '%3B&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
            result = null;

        if(navigator.onLine !== true){
            if(callback) callback({
                result: false,
                record: null,
                msg: me.NO_CONNECTION
            });
            return false;
        }

        Ext.data.JsonP.request({
            url: url,
            timeout: 60000,
            //noCache: false,
            failure: function(error) {
                if (callback) callback({
                    result: false,
                    record: null,
                    msg: error
                });
            },
            success: function(response) {
                var objPlay = null;
                //console.log(response);
                if (response.query) {
                    var r = response.query.results;

                    if (parseInt(response.query.count) == 1) {

                        if (r.video) objPlay = r.video;

                        if (callback) callback({
                            result: true,
                            record: objPlay,
                            msg: this.ONE_RESULT
                        });
                    } else if (parseInt(response.query.count) > 1) {
                        if (r.video) objPlay = r.video[0];

                        if (callback) callback({
                            result: true,
                            record: objPlay,
                            msg: this.MULTPLE_RESULT
                        });
                    } else {
                        //<debug>
                        console.log(response);
                        //</debug>
                        
                        if (callback) callback({
                            result: false,
                            record: objPlay,
                            msg: this.NO_RESULT
                        });
                    }
                } else {
                    if (callback) callback({
                        result: false,
                        record: objPlay,
                        msg: response.error.description
                    });
                }
            }
        });
    },

    getYouTubeSearch: function(search, callback) {
        var query = "SELECT * FROM youtube.search where query ='" + search + "+music+video'";
        this.makeYqlRequest(query, callback);
    },
    getYouTubeVideo: function(id, callback) {
        var query = "SELECT * FROM youtube.video where id ='" + id + "'";
        this.makeYqlRequest(query, callback);
    },
    getYouTube: function(search) {
        //debugger;
        var url = 'http://www.youtube.com/results?search_query=' + search + '+music+video';

        //<debug>
        if (document.location.href.indexOf('test.html') == -1)
        //</debug>
            if (search) {
                //if (window.navigator.standalone === true) {
                //    window.location('http://www.youtube.com/results?search_query=' + search + '+music+video');
                //} else {
                //    window.open('http://www.youtube.com/results?search_query=' + search + '+music+video');
                //}
                window.open(url, '_blank', 'location=no,EnableViewPortScale=yes'); 

            }

        return 'http://www.youtube.com/results?search_query=' + search + '+music+video';
    },
    playSearch: function(url){
        //<debug>
        if (document.location.href.indexOf('test.html') == -1)
        //</debug>
            if (url) {
                //if (window.navigator.standalone === true) {
                //    alert("here we need a phonegap hook");
                //    //window.location.href = url;
                //} else {
                //    window.open(url);
                //}
                window.open(url, '_blank', 'location=no,EnableViewPortScale=yes'); 
            }

        return url;
    },
    play: function(url) {
        url = url.split('watch?v=')[1];
        url = url.split('&feature')[0];
        url = "//www.youtube.com/embed/" + url + '?autoplay=1';
        
        //<debug>
        if (document.location.href.indexOf('test.html') == -1)
        //</debug>
            if (url) {
                //if (window.navigator.standalone === true) {
                //    window.location(url);
                //} else {
                //    window.open(url);
                //}
                window.open(url, '_blank', 'location=no,EnableViewPortScale=yes'); 
            }

        return url;
    }
});
