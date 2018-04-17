'use strict';

const MongoClient=require("mongodb").MongoClient;
//const assert=require('assert');

//数据库连接
function _dbConnect(callback){
	const url="mongodb://localhost:27017";
	MongoClient.connect(url,function(err,db){
		callback(err,db);
	})
}

//插入数据

module.exports.insertOne=(dbname,collectionName,json,callback)=>{
	_dbConnect((err,db)=>{
		if(err){
			callback(err,null);
			db.close();
			return;
		}
		if(arguments.length<4){
			callback("数据插入参数不合要求",null);
			db.close();
			return;
		}
		let _db=db.db(dbname);
		_db.collection(collectionName).insertOne(json,(err,result)=>{
			callback(err,result);
			db.close();
		})
	})
}

//查找数据

module.exports.find=(dbname,collectionName,json,options,callback)=>{
	_dbConnect((err,db)=>{
		if(err){
			callback(err,null);
			db.close();
			return;
		}
		let pageSize,pageIndex,skipNum;
		if(arguments.length==4){
			pageSize=0;
			pageIndex=1;
			skipNum=0;
		}else if(arguments.length==5){
			pageSize=parseInt(options.pageSize) || 0;
			pageIndex=parseInt(options.pageIndex) || 1;
			skipNum=pageSize*(pageIndex-1);
		}else{
			callback("数据插入参数不合要求",null);
			db.close();
			return;
		}
		let _db=db.db(dbname);
		let _json=json || {};
		let cursor=_db.collection(collectionName).find(_json).limit(pageSize).skip(skipNum);
		let result=[];
		cursor.each(function(err,doc){
			if(err){
				callback(err,null);
				db.close();
				return;
			}
			if(doc!=null){
				result.push(doc);
			}else{
				callback(null,result);
				db.close();
			}
		})
	})
}


//删除

module.exports.deleteMany=(dbname,collectionName,json,callback)=>{
	_dbConnect((err,db)=>{
		if(err){
			callback(err,null);
			db.close();
			return;
		}
		if(arguments.length<4){
			callback("数据插入参数不合要求",null);
			db.close();
			return;
		}
		let _db=db.db(dbname);
		_db.collection(collectionName).deleteMany(json,(err,result)=>{
			callback(err,result);
			db.close();
		})
	})
}

//更新

module.exports.updateMany=(dbname,collectionName,jsonMark,jsonContent,callback)=>{
	_dbConnect((err,db)=>{
		if(err){
			callback(err,null);
			db.close();
			return;
		}
		if(arguments.length<5){
			callback("数据插入参数不合要求",null);
			db.close();
			return;
		}
		let _db=db.db(dbname);
		_db.collection(collectionName).updateMany(jsonMark,{$set:jsonContent},(err,result)=>{
			callback(err,result);
			db.close();
		})
	})
}