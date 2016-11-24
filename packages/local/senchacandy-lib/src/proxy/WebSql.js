/**
 * @author Lee Boonstra
 *
 * Rewrote Grgurs Grisogono's WebSQL proxy to support Ext5.
 *
 * WebSQL proxy connects models and stores to local WebSQL database.
 * WebSQL is only available in Chrome and Safari at the moment.
 * 
 * Version: 0.8
 *
 */
Ext.define('SenchaCandyShared.proxy.WebSql', {
    extend: 'Ext.data.proxy.Proxy',
    alias : 'proxy.scwebsql',

    config: {
    	database: 'Sencha',
    	table: 'Sencha',
    	dbVersion: '1.0',
    	dbDescription: '',
    	pkField: 'id',
    	pkType: 'INTEGER PRIMARY KEY ASC',
    	dbSize: 5*1024*1024
    },

    db: null,
    dbModel: null,
    initialData: [],

    constructor: function(config){
    	this.callParent(arguments);

    	this.initialize();
    },
	initialize: function() {
        var me = this,
            pk = 'id',
            db, Model = me.getReader().getModel(),
            m = new Model();

        me.dbModel = Model;

        me.db = db = openDatabase(me.database, me.dbVersion, me.dbDescription, me.dbSize);

        db.transaction(function(tx) {
            pk = me.getPkField();
            query = '('+pk+' ' + me.getPkType()+', '+me.constructFields()+')';

            //console.log("READ " + me.table + query);

            var createTable = function() {
                tx.executeSql('CREATE TABLE IF NOT EXISTS ' + me.getTable() + query,
                    [],
                    Ext.bind(me.addData, me), //on success
                    Ext.bind(me.onError, me) //on error
                );
            }

            tx.executeSql('SELECT * FROM ' + me.getTable() + ' LIMIT 1',
            	[],
            	Ext.emptyFn, 
            	createTable //on error create new table
            );

          });
    },

   parseData: function(tx, rs) {
        var rows = rs.rows,
            data = [],
            i=0;
        for (; i < rows.length; i++) {
            data.push(rows.item(i));
        }
        return data;
    },
    addData: function(newData, clearFirst) {
        var me = this,
            model = me.dbModel,
            data = newData || me.initialData;

        //clear objectStore first
        if (clearFirst===true){
            me.clear();
            me.addData(data);
            return;
        }

        if (Ext.isObject(data) && data.isStore===true) {
            data = me.getDataFromStore(data);
        }

        me.initialDataCount = data.length;
        me.insertingInitialData = true;

        Ext.each(data, function(entry) {
            Ext.create(model, entry).save();
        });
    },
	constructFields: function() {
        var me = this,
            Model = me.dbModel,
            m = new Model(),
            fields = m.getFields(),
            fieldsArray = [],
            idField = me.getPkField(),
            i = 0;

        for(i; i<fields.length; i++){
            if(fields[i].name == idField) {
                //do not add
            } else if(fields[i].type == "int") {
                fieldsArray.push(fields[i].name + " INTEGER");
            } else if(fields[i].type == "int") {
                fieldsArray.push(fields[i].name + " INTEGER");
            } else if(fields[i].type == "date") {
                fieldsArray.push(fields[i].name + " DATETIME");
            } else {
                fieldsArray.push(fields[i].name + " TEXT");
            }
        };

        return fieldsArray.join(',');
    },

    onError: function(err, e) {
        var error = (e && e.message) || err;
        Ext.Error.raise(error, arguments);
    },
 
     /**
     * Injects data in operation instance
     */
    readCallback: function(operation, records) {
        var me = this,
        recs = [],
        obj,
        data;

        Ext.each(records, function(r){
            data = r.data;
            obj = {};

            //we will remove the id from the data object bc that's buggy
            for(var propt in data){
                obj[propt] = data[propt];
            }
            recs.push(Ext.create(me.model, obj));
        });

        operation.setResultSet(Ext.create('Ext.data.ResultSet', {
            records: recs,
            total  : recs.length,
            loaded : true
        }));
        operation.setSuccessful(true);
    },
    /**
     * @private
     * Fetches all records
     * @param {Function} callback Callback function
     * @param {Object} scope Callback fn scope
     */
    getAllRecords: function(callback, scope) {
        var me = this,
            Model = me.dbModel,
            record,
            onSuccess = function(tx,rs) {
                var records = me.parseData(tx,rs),
                    results = [],
                    i=0,
                    id;
                me.fireEvent('success-getallrecords');
                for (; i<records.length;i++) {
                    results.push(Ext.create(Model, records[i]));
                }

                if (typeof callback == 'function') {
                    callback.call(scope || me, results, me);
                }
            }

        me.db.transaction(function(tx){
            tx.executeSql('SELECT * FROM ' + me.getTable(),
                [],
                onSuccess,  //on success
                Ext.bind(me.onError, me));        // on error
        });

        return true;
    },
    getRecord: function(id, callback){
    	var me = this,
            Model = this.model,
            record;

    	onSuccess = function(tx,rs) {
            var result = me.parseData(tx,rs);
            record = new Model(result, id);
            me.fireEvent('success-getrecord');

            if (typeof callback == 'function') {
                callback.call(scope || me, result, me);
            }
        }

    	me.db.transaction(function(tx){
            tx.executeSql('SELECT * FROM ' + me.getTable() + ' where '+me.getPkField()+' = ?',
                [id],
                onSuccess,  //on success
                Ext.bind(me.onError, me) // on error
            )
        });
    },
    updateRecord: function(record){
        var me = this,
            modifiedData = record.modified,
            newData = record.data,
            fields = [],
            values = [],
            placeholders = [],
            onSuccess = function(tx,rs) {
                if (!rs.rowsAffected) me.setRecord(record);
                me.fireEvent('success-update');
            };

        for (var i in modifiedData) {
            fields.push(i+' = ?');
            values.push(newData[i]);
        }
        values.push(record.id);
  
        me.db.transaction(function(tx){
            tx.executeSql('UPDATE ' + me.getTable() + ' SET '+fields.join(',')+' WHERE '+me.getPkField()+' = ?',
                values,
                onSuccess,  //on success
                Ext.emptyFn
                //Ext.bind(me.setRecord, me, [record]) // on error
            );        
        });

        return true;   
    },
    setRecord: function(record){
        var me = this,
            rawData = record.data,
            fields = [],
            values = [],
            placeholders = [],
            onSuccess = function(tx,rs) {
                me.fireEvent('success-create');
            };

        //extract data to be inserted
        for (var i in rawData) {
            if(i != me.getPkField()){
                fields.push(i);
                values.push(rawData[i]);
                placeholders.push('?');
            }
        }

        //console.log(me.getTable()+'('+fields.join(',')+') VALUES ('+placeholders.join(',')+')', values);

        me.db.transaction(function(tx){
            tx.executeSql('INSERT INTO ' + me.getTable()+'('+fields.join(',')+') VALUES ('+placeholders.join(',')+')',
                values,
                onSuccess,  //on success
                Ext.bind(me.onError, me));        // on error
        });


        return true;        
    },
    /*
     *
     * CRUD
     *
     */
    create: function(operation, callback, scope){
    	//console.error("create");

        var me = this,
            records = operation.getRecords(),
            length = records.length,
            record, i;

        operation.setStarted();

        for (i = 0; i < length; i++) {
            record = records[i];
            this.setRecord(record);
            record.commit();
        }

        operation.setSuccessful(true);

        if (typeof callback == 'function') {
             callback.call(scope || this, operation);
        }
    },
    read: function(operation, callback, scope) {
        var records = [],
            me      = this;

        var finishReading = function(record) {
            me.readCallback(operation,record);

            if (typeof callback == 'function') {
                callback.call(scope || this, operation);
            }
        }

        //read a single record
        if (operation.id) {
            this.getRecord(operation.id,finishReading,me);
        } else {
            this.getAllRecords(finishReading,me);
            operation.setSuccessful();
        }
    },
    update: function(operation, callback, scope){
    	//console.error("update");

        operation.setStarted();
        var records = operation.getRecords();

        for (i = 0; i < records.length; i++) {
            record = records[i];
            this.updateRecord(record);
            record.commit();
        }
        operation.setSuccessful(true);

        if (typeof callback == 'function') {
             callback.call(scope || this, operation);
        }

    },
    erase: function(operation, callback, scope){
    	//console.error("erase");

        var me = this;
        operation.setStarted();

        var onSuccess = function(){
            me.fireEvent('success-erase');
            operation.setSuccessful(true);
        }

        var records = operation.getRecords();
        if(records && records.length == 1){
            //console.log("remove one");
            var id = records[0].getData().id;
            me.db.transaction(function(tx){
                tx.executeSql('DELETE FROM ' + me.getTable() + ' WHERE ' + me.getPkField() +' = ?',
                    [id],
                    onSuccess,  //on success
                    Ext.bind(me.onError, me) // on error
                );        
            });
        } else {
            //console.log("remove all");
            me.db.transaction(function(tx){
                tx.executeSql('DELETE FROM ' + me.getTable(),
                    [],
                    onSuccess,  //on success
                    Ext.bind(me.onError, me)); // on error
            });
        }

        return true;
    }
})