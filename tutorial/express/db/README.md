# 操作 MongoDB
官方 api `http://mongodb.github.io/node-mongodb-native/`

```javascript
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var db;

MongoClient.connect("mongodb://localhost:27017/test1705candel", function(err, database) {
  if(err) throw err;

  db = database;
});

module.exports = {
    insert: function(_collection, _data, _callback){
        var i = db.collection(_collection).insert(_data).then(function(result){
            _callback(result);
        });
    },
    select: function(_collection, _condition, _callback){
        var i = db.collection(_collection).find(_condition || {}).toArray(function(error, dataset){
            _callback({status: true, data: dataset});
        })
    }
}
```

# 操作 MySql
```javascript
var mysql = require('mysql');

//创建连接池
var pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  port: 3306,
  database: '1000phone',
  multipleStatements: true
});


module.exports = {
    select: function(tsql, callback){
        pool.query(tsql, function(error, rows){
      if(rows.length > 1){
        callback({rowsCount: rows[1][0]['rowsCount'], data: rows[0]});
      } else {
        callback(rows);
      }
        })
    }
}
```
