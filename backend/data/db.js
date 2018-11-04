var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
let db;
let collection;

MongoClient.connect("mongodb://mongobase:27017", {useNewUrlParser:true})
  .then(client => {
    db = client.db('gym');
    collection = db.collection('trainning-sessions');
  })
  .catch(error => {
    console.log(error);
  });
  
module.exports = {
    addSession: function (session){
        return collection.insertOne(session);
    }, 
    
    deleteSession: function(id){
        return collection.deleteOne({_id: ObjectId(id)});
    },
    
    
    updateSession: function (id, session){
        return collection.updateOne({_id: ObjectId(id)}, {$set:session});
    },
    
    getSession: function (id){
        return collection.find({_id: ObjectId(id)}).toArray();
    },
    
    getSessions: function (){
        return collection.find({}).toArray();
    }
}
