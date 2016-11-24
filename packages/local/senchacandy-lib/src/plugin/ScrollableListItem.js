/**
 * @author Lee Boonstra
 *
 * This is a scrollable list item
 *
 * ## Example
 *
 *     Ext.create('Ext.dataview.List', {
 *
 *         store: Ext.create('TweetStore'),
 *
 *         plugins: [
 *             {
 *                 xclass: 'SenchaCandyShared.plugin.ScrollableListItem',
 *                 direction: 'top',
 *                 scrollTpl: '<img src="{url}"/>',
 *                 scrollData: {
 *                   url: 'http://dummyimage.com/300x200/000/fff'
 *                 }
 *             },
 *             {
 *                 xclass: 'SenchaCandyShared.plugin.ScrollableListItem',
 *                 direction: 'bottom',
 *                 component: {
 *                   xtype: 'container',
 *                   html: 'My container'
 *                 },
 *                listeners: {
 *                  tapscrollable: function(e, cmp) {}
 *                }
 *             }
 *         ],
 *
 *         itemTpl: [
 *             '<img src="{profile_image_url}" />',
 *             '<div class="tweet">{text}</div>'
 *         ]
 *     });
 */
Ext.define('SenchaCandyShared.plugin.ScrollableListItem', {
  extend: 'Ext.Component',
  alias: 'plugin.scrollablelistitem',

  config: {
    /**
       * @private
       * @cfg {String} direction 'top' or 'bottom'. Defaults to 'top'
       */
    direction: 'bottom',

    /**
       * @private
       * @cfg {String} tpl The template used to scroll with the list
       */
    scrollTpl: null,

    /**
       * @private
       * @cfg {Object} data to prefill template
       */
    scrollData: null,

    /**
     * @cfg {Object} scrollableCmp
     * @private
     */
    component: null,

    /**
     * @private
     * @cfg {Ext.List} list Local reference to the List this plugin is bound to
     */
    list: null,

    /**
     * @private
     * @cfg {Boolean} loadMoreCmpAdded Indicates whether or not the load more component has been added to the List
     * yet.
     */
    scrollableCmpAdded: false,

    /**
     * @private
     * @cfg {Ext.scroll.Scroller} scroller Local reference to the List's Scroller
     */
    scroller: null
  },

  /**
   * @private
   * Sets up all of the references the plugin needs
   */
  init: function(list) {
      var scroller = list.getComponent();
      this.setList(list);
      this.setScroller(scroller);

      this.addScrollableCmp();
  },

  /**
    * @private
    * Because the attached List's inner list element is rendered after our init function is called,
    * we need to dynamically add the loadMoreCmp later. This does this once and caches the result.
    */
  addScrollableCmp: function(){
    var list = this.getList(),
        cmp  = this.getComponent();

    if(!cmp){
      cmp = this.getScrollableTplCmp();
    }

    if (!this.getScrollableCmpAdded()) {
      list.add(cmp);

      list.fireEvent('scrollablecomponentadded', this, list);
      this.setScrollableCmpAdded(true);
    }

    return cmp;
  },


/**
 * @private
 */
applyComponent: function(config) {
  var me = this;
      config = Ext.merge(config, {
          baseCls: Ext.baseCSSPrefix + 'scroll-component',
          scrollDock: me.getDirection(),
          flex: 1,
          listeners: {
            tap: {
                fn: function(e, cmp){
                  /**
                  * @event tapscrollable  Fired when you tap the scrollable  component.
                  * @param {Event} the tap event
                  * @param {SenchaCandyShared.plugin.ScrollableListItem} this the ScrollableListItem plugin
                  */
                  this.fireEvent('tapscrollable', e, cmp)
                },
                scope: this,
                element: 'element'
            }
         }
      });

    //console.log(Ext.factory(config, Ext.Component, this.component));
    return Ext.factory(config, Ext.Component, this.component);
  },
  /**
   * @private
   */
  getScrollableTplCmp: function() {
    var me = this;
    return {
        xtype: 'component',
        tpl: new Ext.XTemplate(me.getScrollTpl()),
        data: me.getScrollData(),
        scrollDock: me.getDirection(),
        height: me.getHeight(),
        flex: 1,
        listeners: {
          tap: {
              fn: function(e, cmp){
                /**
                * @event tapscrollable  Fired when you tap the scrollable  component.
                * @param {Event} the tap event
                * @param {SenchaCandyShared.plugin.ScrollableListItem} this the ScrollableListItem plugin
                */
                this.fireEvent('tapscrollable', e, cmp)
              },
              scope: this,
              element: 'element'
          }
       }
    };
  }
});
