let mysql = require('mysql');
let pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '8889', // 默认是3306
    database: '1810'
});
let connect = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            resolve({
                connection
            })
        })
    });
}

let insert = (table, params) => {
    return new Promise(async (resolve, reject) => {
        let {
            connection
        } = await connect();
        connection.query(`INSERT INTO ${table} SET ?`, [{
            ...params
        }], (error, results, fields) => {
            connection.release();
            error ? reject(error) : resolve(results)
        });
    })
}
module.exports = {
    connect,
    insert
}

// var db = require("./db.js");
// (async function () {
//     console.log(db)
//     await db.insert('students', {
//         name: "laoxie",
//         skill: "ps",
//         age: 16
//     })
// })()