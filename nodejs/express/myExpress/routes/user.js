const express=require('express');

//引入user-ctrl
const ctrl=require('../src/ctrl/user-ctrl');

let router=express.Router();

router.get('/one',ctrl.one);

router.get('/all',ctrl.all);

module.exports=router;