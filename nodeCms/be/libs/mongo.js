//引入模块
const mongodb = require('mongodb');
const {
    MongoClient,
    ObjectId
} = mongodb;

const {
    DBhost,
    database
} = require('./config.json');

exports.connect = () => {
    //连接MongoDB并连接数据库，无则自动创建
    return new Promise((resolve, reject) => {
        MongoClient.connect(DBhost, {
            useNewUrlParser: true
        }, (err, client) => {
            if (err) throw err;
            let db = client.db(database);
            resolve({
                db,
                client
            });
            // client.close();
        });
    });
}


//封装增删查改
exports.insert = (collectionName, data) => {
    return new Promise(async (resolve, reject) => {
        let {
            db,
            client
        } = await this.connect();
        let col = db.collection(collectionName);
        col[Array.isArray(data) ? 'insertMany' : 'insertOne'](data, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
            client.close();
        })
    });
}

/**
 * @删除
 * 支持单条删除和多条删除
 */
exports.delete = (collectionName, query) => {
    return new Promise(async (resolve, reject) => {
        let {
            db,
            client
        } = await this.connect();
        let col = db.collection(collectionName);
        // 条件筛选
        // 如有id, 则只要使用id查询
        if (query._id) {
            query = {
                _id: ObjectId(query._id)
            };
        }
        col[Array.isArray(query) ? 'deleteMany' : 'deleteOne'](query, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
            client.close();
        })
    });
}

/**
 * @修改
 * 支持单条和多条修改
 */
exports.update = (collectionName, query, data) => {
    return new Promise(async (resolve, reject) => {
        let {
            db,
            client
        } = await this.connect();
        let col = db.collection(collectionName);
        col[Array.isArray(query) ? 'updateMany' : 'updateOne'](query, {
            $set: data
        }, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
            client.close();
        })
    });
}

/**
 * @修改
 * 支持单条和多条修改
 */
exports.find = (collectionName, query) => {
    return new Promise(async (resolve, reject) => {
        let {
            db,
            client
        } = await this.connect();

        let col = db.collection(collectionName);
        // 条件筛选
        if (query._id) {
            query._id = ObjectId(query._id);
        }
        col.find(query).toArray((err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
            client.close();
        })
    });
}