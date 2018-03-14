const url=require('url');
const querystring = require('querystring');

//引入 user-service
const service=require('../secvice/user-service');
exports.all=(req,res)=>{
    service.all((data)=>{
        res.send(data)
    })
};
exports.one=(req,res)=>{
    let path=url.parse(req.url).search?url.parse(req.url).search.slice(1):'id=1';
    let id=querystring.parse(path).id;
    service.one(id,(data)=>{
        res.send(data)
    })
};