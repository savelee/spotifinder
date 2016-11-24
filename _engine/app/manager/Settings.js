Ext.define('Engine.manager.Settings', {
    singleton: true,

    requires: [
    	'Ext.Promise'
    ],

    getStore: function(){
    	return Ext.getStore('Settings');
    },

    //promises
    requestUserName: function(){

    	var s = this.getStore();
    	return new Ext.Promise(function (resolve, reject) {
	    	s.load({
				callback: function(records, operation, success) {
			        if(success){
			        	if(records.length > 0){
			        		resolve(records);
			        	} else {
							console.log("there are no records");
			        		resolve(false);
			        	}
			        } else{
			        	reject(operation);
			        }
			    }
			});
    	});

    	/**
    	//implementation
    	Engine.manager.Settings.requestUserName().then(function(records){
  			if(records){
			    //do something
			  }
			}, function(error){
			  //throw error
			});
    	},
    	**/
    },
    clearSettings: function(){
    	var s = this.getStore();
    	return new Ext.Promise(function (resolve, reject) {
			s.removeAll();

	    	s.sync({
	    		success: function(response){
	    			resolve(response);
	    		},
	    		failure: function(response){
	    			reject(response);
	    		}
	    	});
    	});
    },

    saveSettings: function(settings){
    	var s = this.getStore(),
    		me = this;
		
    	return new Ext.Promise(function (resolve, reject) {

    		me.requestUserName().then(function(records){
	    			if(records){
						//<debug>
		    				console.log("old username:", records[0].getData().username);
		    			//</debug>
				    	records[0].set(settings);
			    	} else {
						s.add(settings);
					}

					s.sync({
			    		success: function(response){
					    	//<debug>
			    				console.log("new username:", settings.username);
			    			//</debug>

			    			resolve(response);
			    		},
			    		failure: function(response){
							  //<debug>
			    				console.error(response);
			    			//</debug>

			    			reject(response);
			    		}
			    	});

	    		}, function(err){
	    			//<debug>
	    				console.error(err);
	    			//</debug>
	    		}
    		);
    	});
    }
});
