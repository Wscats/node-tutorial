let mysql = require('mysql');
let config = require('./config.json');
let pool = mysql.createPool({
    connectionLimit: 10,
    host: config.host,
    user: config.user,
    port: config.port,
    password: config.password,
    database: config.database
});
let connect = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            !err ? resolve(connection) : reject(err)
        });
    })
}

let find = (table, params) => {
    return new Promise(async (resolve, reject) => {
        let connection = await connect();
        connection.query(`SELECT * FROM ${table} ${params?'where ?':''}`, [{
            ...params
        }], (err, results, fields) => {
            !err ? resolve(results) : reject(err)
            connection.release();
        });
    })
}

let insert = (table, params) => {
    return new Promise(async (resolve, reject) => {
        let connection = await connect();
        connection.query(`INSERT INTO ${table} SET ?`, [{
            ...params
        }], (err, results, fields) => {
            !err ? resolve(results) : reject(err)
            connection.release();
        })
    })
}

let del = (table, params) => {
    return new Promise(async (resolve, reject) => {
        let connection = await connect();
        connection.query(`DELETE FROM ${table} WHERE ?`, [{
            ...params
        }], (err, results, fields) => {
            !err ? resolve(results) : reject(err)
            connection.release();
        })
    })
}

let update = (table, params1, params2) => {
    return new Promise(async (resolve, reject) => {
        let connection = await connect();
        connection.query(`UPDATE ${table} SET ? WHERE ?`, [{
            ...params1
        }, {
            ...params2
        }], (err, results, fields) => {
            !err ? resolve(results) : reject(err)
            connection.release();
        })
    })
}
module.exports = {
    connect,
    find,
    insert,
    del,
    update
}