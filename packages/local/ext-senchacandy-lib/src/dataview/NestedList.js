/**
 * NestedList provides a miller column interface to navigate between nested sets
 * and provide a clean interface with limited screen real-estate.
 *
 *     @example miniphone preview
 *      var data = {
 *          text: 'Groceries',
 *          items: [{
 *              text: 'Drinks',
 *              items: [{
 *                  text: 'Water',
 *                  items: [{
 *                      text: 'Sparkling',
 *                      leaf: true
 *                  }, {
 *                      text: 'Still',
 *                      leaf: true
 *                  }]
 *              }, {
 *                  text: 'Coffee',
 *                  leaf: true
 *              }, {
 *                  text: 'Espresso',
 *                  leaf: true
 *              }, {
 *                  text: 'Redbull',
 *                  leaf: true
 *              }, {
 *                  text: 'Coke',
 *                  leaf: true
 *              }, {
 *                  text: 'Diet Coke',
 *                  leaf: true
 *              }]
 *          }, {
 *              text: 'Fruit',
 *              items: [{
 *                  text: 'Bananas',
 *                  leaf: true
 *              }, {
 *                  text: 'Lemon',
 *                  leaf: true
 *              }]
 *          }, {
 *              text: 'Snacks',
 *              items: [{
 *                  text: 'Nuts',
 *                  leaf: true
 *              }, {
 *                  text: 'Pretzels',
 *                  leaf: true
 *              }, {
 *                  text: 'Wasabi Peas',
 *                  leaf: true
 *              }]
 *          }]
 *      };
 *
 *      Ext.define('ListItem', {
 *          extend: 'Ext.data.Model',
 *          config: {
 *              fields: [{
 *                  name: 'text',
 *                  type: 'string'
 *              }]
 *          }
 *      });
 *
 *      var store = Ext.create('Ext.data.TreeStore', {
 *          model: 'ListItem',
 *          defaultRootProperty: 'items',
 *          root: data
 *      });
 *
 *      var nestedList = Ext.create('SenchaCandy.NestedList', {
 *          fullscreen: true,
 *          title: 'Groceries',
 *          displayField: 'text',
 *          store: store
 *      });
 *
 * @aside guide nested_list
 * @aside example nested-list
 * @aside example navigation-view
 *
Ext.define('SenchaCandy.dataview.NestedList', {
    extend: 'Ext.panel.Panel',
    xtype: 'scnestedlist',
    requires: [
        'Ext.view.View',
        'Ext.fx.animation.Slide',
        'Ext.toolbar.Spacer'
    ],

    layout: 'card',

    config: {
        backBtnText: 'Back'
    },

    currentNode: null,
    list: null,
    cls: 'x-nestedlist',

    initComponent: function () {
        var me = this,
            store = me.getStore(me.store);

        me.list = Ext.create('Ext.view.View', {
            store: store,
            itemSelector: 'div.item',
            autoScroll: true,
            tpl: ['<tpl for=".">', '<div class="item {icon} <tpl if="leaf">leaf <tpl else>expand</tpl>">{text}</div>', '</tpl>'],
            listeners: {
                itemclick: {
                    fn: 'onItemClick',
                    scope: me
                }
            }
        });

        Ext.apply(me, {
            header: {
                items: [{
                    xtype: 'button',
                    listeners: {
                        click: {
                            fn: 'onBackBtn',
                            scope: me
                        }
                    },
                    hidden: true,
                    itemId: 'backbtn',
                    ui: 'back',
                    text: me.getBackBtnText()
                }, {
                    xtype: 'component',
                    itemId: 'spacer',
                    width: 40,
                    height: 20,
                    margin: '0 5 0 0'
                }],
                titlePosition: 2
            },
            items: [me.list],
            listeners: {
                afterrender: {
                    fn: me.syncToolbar(store.getAt(0).parentNode)
                }
            }
        });

        this.callParent(arguments);
    },

    getStore: function(store) {
        if (store) {
            if (Ext.isString(store)) {
                // store id
                store = Ext.data.StoreManager.get(store);
            } else {
                // store instance or store config
                if (!(store instanceof Ext.data.TreeStore)) {
                    store = Ext.factory(store, Ext.data.TreeStore, null);
                }
            }
        } else {
            console.log("Store is missing");
        }

        return store;
    },

    onBackBtn: function() {
        var me = this,
            node = me.currentNode;

        me.goToNode(node, true);
    },
    onItemClick: function(view, record, item, index, e) {
        var me = this,
            store = view.getStore(),
            node = store.getAt(index);

        me.fireEvent('itemclick', this, record, item, index, e);
        if (node.isLeaf()) {

            /**
             * @event leafitemclick
             * Fires when a node is the leaf node
             * @param {NestedList} this
             * @param {Ext.data.Model} record The record tapped.
             * @param {HTMLElement} item The item's element.
             * @param {index} record The item's index number.
             * @param {Ext.event.Event} e The raw event object.
             *
            me.fireEvent('leafitemclick', this, record, item, index, e);
        } else {
            me.fireEvent('nodeclick', this, record, item, index, e);
            me.goToNode(node, false);
        }
    },

    //goToLeaf: function(node){
    //    console.log("ACTION");
    //},

    goToNode: function(node, isBack) {
        if (!node) {
            return;
        }

        var me = this,
            l1 = me.list;

        me.currentNode = node.parentNode;

        if (isBack) {
            if (!me.currentNode) {
                me.down('#backbtn').hide();
                me.down('#spacer').show();
            }

            l1.store.setRecursive(false);
            l1.store.setNode(node);

            me.getLayout().setActiveItem(l1);
            l1.getEl().slideIn('l', {
                duration: 150
            });
        } else {
            me.down('#backbtn').show();
            me.down('#spacer').hide();

            l1.store.setRecursive(false);
            l1.store.setNode(node);

            me.getLayout().setActiveItem(l1);
            l1.getEl().slideIn('r', {
                duration: 200
            });
        }

        me.syncToolbar(node);
    },

    syncToolbar: function(node) {
        this.setTitle(node.getData().text);
    }

});
*/