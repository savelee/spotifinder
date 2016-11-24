Ext.define('Engine.store.LastFmResults', {
    extend: 'Ext.data.Store',

    pageSize: 100,
    buffered: true

    /*,listeners: {
      'load': function(recs){
        //console.log(recs.last().getData().artistimage);
        Ext.ComponentQuery.query('carousel')[0].add({
          flex: 1,
          height: 200,
          xtype: 'img',
          src: recs.last().getData().artistimage
        });
      }
  }*/
});
