var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
let db;
let collection;

MongoClient.connect("mongodb://localhost:27017", {useNewUrlParser:true})
  .then(client => {
    db = client.db('gym');
    collection = db.collection('trainning-sessions');
  })
  .catch(error => {
    console.log(error);
  });

let fields = ['date_done', 'duration', 'calories', 'fc', 'temperature']  
function check_fields(vals, require_all){
    let validate = true;
    let new_vals = {};
    fields.forEach(field => {        
        if(vals.hasOwnProperty(field))
            new_vals[field] = vals[field];
        else
            validate = false;
    });
    return require_all && validate || !require_all ? new_vals : false;

}
  
module.exports = {
    addSession: function (session){
        console.log(session);
        return collection.insertOne(session);
    }, 
    
    deleteSession: function(id){
        console.log(`Eliminando Servicio: ${id}`);
        return collection.deleteOne({_id: ObjectId(id)});
    },
    
    
    updateSession: function (id, session){
        console.log(`Actualizando Servicio: ${id}`);
        return collection.updateOne({_id: ObjectId(id)}, {$set:session});
    },
    
    getSession: function (id){
        console.log("GETTING ID:" + id);
        return collection.find({_id: ObjectId(id)}).toArray();
    },
    
    getSessions: function (){
        return collection.find({}).toArray();
    }
}
