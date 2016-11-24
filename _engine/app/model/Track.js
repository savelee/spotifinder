Ext.define('Engine.model.Track', {
    extend: 'Engine.model.LastFmResult',

    fields: [{
    	name: 'artist'
    },
    {
    	name: 'album'
    },
    {
        name: 'artistname',
        calculate: function(data) {
            if(data.artist){
                return data.artist.name;
            }
        }
    },{
        name: 'albumname',
        calculate: function(data) {
            if(data.album){
                return data.album.name;
            }
        }    	
    }]

});
