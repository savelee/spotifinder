Ext.define('Engine.controller.Global', {
    extend: 'Ext.app.Controller',

	  listen: {
         component: {
             '*': {
                 routechange: 'updateRoute'
             }
         }
    },

    updateRoute: function(item){
        if(typeof item == "string") {
            this.redirectTo(item);
        }else{
        	if(item && item.getItemId()){
    	        var hash = '!' + item.getItemId();
    	        this.redirectTo(hash);
        	}
        }
    }
});
