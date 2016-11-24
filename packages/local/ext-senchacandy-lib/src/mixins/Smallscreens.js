/**
 * @author Lee Boonstra
 *
 * This is a mixin which can switch between smallscreens
 * A smallscreen is a phone or a device in portrait
 *
 *     Ext.define('MyView', {
 *          extend: 'Ext.panel.Panel',
 *          mixin: ['SenchaCandy.mixins.Smallscreens'],
 *
 *          afterRender: function(){
 *             this.callParent(arguments);
 *             this.updateSmallscreen(Ext.dom.Element.getOrientation() === "portrait" || Ext.os.deviceType ==="Phone");
 *          },
 *			updateSmallscreen: function(smallscreen){
 *      		if(this.rendered){
 *          		if(smallscreen){
 *              		//build smallscreen interface
 *           		} else {
 *               		//build normal interface    
 *           		}
 *       		}
 *   		}
 *     });
 *
 *
Ext.define('SenchaCandy.mixins.Smallscreens', {
    extend: 'Ext.Mixin',
    statics: {
        isSmallScreen: function(context){
            return (Ext.dom.Element.getOrientation() === "portrait" || Ext.os.deviceType ==="Phone" );
        }
    },
    config: {
       smallscreen: false
    },
    plugins: ['responsive'],
    responsiveFormulas: {
        smallscreen: function (context) {
            //it's a mini interface when
            //portrait mode on a tablet or desktop
            //or any mode on a phone
            return SenchaCandy.mixins.Smallscreens.isSmallScreen(context);
        }
    },
    responsiveConfig: {
        landscape: {
            smallscreen: false
        },
        smallscreen: {
            smallscreen: true
        }
    }
});*/