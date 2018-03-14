//引入 mysql 需要先下载 http://www.expressjs.com.cn/guide/database-integration.html
let mysql = require('mysql');

module.exports=function (sql,callback) {
    let connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        database:'test1',
        user: 'root',
        password: ''
    });
    connection.connect();

    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        // console.log(rows);
        callback(rows)
    });

    connection.end();
};