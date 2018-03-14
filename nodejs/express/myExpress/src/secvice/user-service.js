//引入sql
const mysql=require('../untl/sql');

module.exports={
    all:(callback) =>{
        let sql='SELECT * FROM `student`';
        mysql(sql,callback)
    },
    one:(id,callback)=>{
        let sql='SELECT * FROM `student`WHERE id='+id;
        mysql(sql,callback)
    }
}
