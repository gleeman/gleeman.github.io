'use strict';
const mongoose=require("mongoose");

const db=mongoose.createConnection("mongodb://localhost/test");

db.on('error',(err)=>{
  console.log(err);
})

db.once('open',(callback)=>{
  console.log('打开数据库');
})

module.exports=db;
