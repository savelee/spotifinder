Ext.define('Engine.model.Album', {
    extend: 'Engine.model.LastFmResult',

    fields: [{
    	name: 'artist'
    },
    {
        name: 'artistname',
        calculate: function(data) {
            if(data.artist){
                return data.artist.name;
            }
        }
    }]
});
