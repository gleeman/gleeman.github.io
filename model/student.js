'use strict';

const mongoose=require("mongoose");
const db=require("./mongoose.js");

const studentSchema= new mongoose.Schema({
  "name":String,
  "age":Number,
  "sex":String
});

const Student=db.model('Student',studentSchema);

//创建学生实现id自增
// db.system.js.insert(
// {_id:"getNextSequence",value:function getNextSequence(name) {
//    var ret = db.counters.findAndModify(
//           {
//             query: { _id: name },
//             update: { $inc: { seq: 1 } },
//             new: true
//           }
//    );
//    return ret.seq;
// }
// });




//创建学生
function create(options){
  Student.create(options).then((result)=>{
    console.log(result);
    //关闭数据库(会退出程序)
    //db.close();
  })
}

//查找学生
const find=studentSchema.static._find=function(options,callback){
  db.model('Student').find(options,(err,result)=>{
    if(err){
      console.log(err);
      return;
    }
    if(!!callback && typeof callback=='function'){
      callback(result);
    }
    //db.close();
  });
}

//更新学生信息

const update=studentSchema.static._update=function(conditions,update,options,callback){
    db.model('Student').update(conditions,update,options,(err,result)=>{
      if(err){
        console.log(err);
        return;
      }
      if(!!callback && typeof callback=='function'){
        callback(result);
      }
      //db.close();
    });
}

//删除学生

const delete=studentSchema.static._delete=function(options,callback){
  db.model('Student').deleteMany(options,(err,result)=>{
    if(err){
      console.log(err);
      return;
    }
    if(!!callback && typeof callback=='function'){
      callback(result);
    }
    //db.close();
  });
}



module.exports={
  create:create,
  find:find,
  update:update,
  delete:delete
};
