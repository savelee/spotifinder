Ext.define('Engine.model.Recent', {
    extend: 'Engine.model.LastFmResult',

    fields: [{
        name: 'artist'
    },
    {
        name: 'album'
    },
    {
        name: 'date'
    },
    {
        name: 'artistname',
        calculate: function(data) {
            if(data.artist){
                return data.artist['#text'];
            }
        }
    },{
        name: 'albumname',
        calculate: function(data) {
            if(data.album){
                return data.album['#text'];
            }
        }       
    }, {
        name: 'lastplayed',
        type: 'date',
        dateFormat: 'd M Y, H:i', //15 Aug 2014, 17:10
        calculate: function(data){
            if(data.date){
                return data.date['#text'];
            }
        }
    }]
});
