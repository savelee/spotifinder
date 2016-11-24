/**
 * @author Lee Boonstra
 *
 * This is a form field toggle button based on
 * http://proto.io/freebies/onoff
 *
 * Ext.create('Ext.form.Panel', {
 *   title: 'Base Example',
 *
 *   items: [{
 *       xtype: 'sctogglefield',
 *       fieldLabel: 'Sync',
 *       name: 'sync'
 *   }],
 *   renderTo: Ext.getBody()
 * });

Ext.define('SenchaCandy.form.field.ToggleButton', {
	extend: 'Ext.form.field.Checkbox',
	xtype: 'sctogglebutton',

	onText: 'on',
	offText: 'off',
	fieldName: 'onoffswitch',

	config: {


        **
         * @cfg {string} checked
         * Enable or disable the togglefield. Defaults to false.
         * @accessor
         *
		checked: false
	}


	,fieldSubTpl: [
        '<div class="onoffswitch">',
                '<input type="checkbox" id="{id}" data-ref="inputEl" role="{role}" {inputAttrTpl}',
                '<tpl if="tabIdx != null"> tabindex="{tabIdx}"</tpl>',
                '<tpl if="disabled"> disabled="disabled"</tpl>',
                '<tpl if="fieldStyle"> style="{fieldStyle}"</tpl>',
                ' class="onoffswitch-checkbox {fieldCls} {typeCls} {typeCls}-{ui} {inputCls} {inputCls}-{ui} {childElCls} {afterLabelCls}" autocomplete="off" hidefocus="true"',
                '<tpl if="checked"> checked="checked"</tpl>',
                '/>',
                '<label class="onoffswitch-label" for="{id}-input">',
                        '<span class="onoffswitch-inner" data-onText="{onText}" data-offText="{offText}"></span>',
                        '<span class="onoffswitch-switch"></span>',
                '</label>',
        '</div>'
    ],


	initEvents: function() {
        var me = this,
        	togglebutton = me.getToggleButtonElement();

        me.callParent(arguments);

        // We rely on the labelEl to also trigger a click on the DOM element, so force
        // a click here and never have it translate to a tap
        me.mon(togglebutton, 'click', me.toggle, me, {
            //translate: false
        });
    },
    getToggleButtonElement: function() {
		return this.el.down('.onoffswitch');
	},
    toggle: function(){
    	var me = this,
    		val = me.getValue(),
    		cb = me.inputEl.dom;

    		if(val){
    			cb.checked = false;
    			me.setValue(false);
    		} else {
    			cb.checked = true;
    			me.setValue(true);
    		}
    },
	beforeRender: function () {
	     var me = this;
	     me.callParent(arguments);

	     // Apply the renderData to the template args
	     Ext.applyIf(me.subTplData, {
	         onText: me.onText,
	         offText: me.offText,
	         name: me.fieldName,
	         checked: me.checked
	     });
	}
});
*/
