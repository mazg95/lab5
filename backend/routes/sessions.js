var express = require('express');
var router = express.Router();
var db = require('../data/db');

const redis = require('redis');
const client = redis.createClient(6379, 'localhost');

client.on('connect', function() {
  console.log('Redis client connected');
});

// Print redis errors to the console
client.on('error', (err) => {
  console.log("Error " + err);
});

const Joi = require('joi');
const expressJoi = require('express-joi-validator');

const schemaPost = {
  body: {
      date_done: Joi.string().required(),
      duration: Joi.number().required(),
      calories: Joi.number().required(),
      fc: Joi.number().required(),
      temperature: Joi.number().required()
  }
}

const schemaPut = {
  body: {
    _id: Joi.string(),
    date_done: Joi.string(),
    duration: Joi.number(),
    calories: Joi.number(),
    fc: Joi.number(),
    temperature: Joi.number()
  }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  client.get('sessions/all', (err, result) => {
    if(result){ // Se encontro en la cache
      const resultJSON = JSON.parse(result);
      res.status(200).json(resultJSON);
    }else{ // No se encontro en la cache
      db.getSessions()
      .then(response => {
        //se agrega key/value a la cache
        client.setex('sessions/all', 5, JSON.stringify(response));
        res.status(200).json(response); // se responde la peticion
      })
      .catch(error => console.error(error));
    }
  });
});

function check_object_id(req, res, next){
  let id = req.params.id;
  if(id.length != 12 && id.length != 24){
    return res.sendStatus(404);
  }
  next();
}

router.get('/:id', check_object_id ,function(req, res, next){
  let id = req.params.id;
  
  client.get(`sessions/${id}`, (err, result) => {
    if(result){ //se encontro en la cache
        const resultJSON = JSON.parse(result);
        res.status(200).json(resultJSON);
    } else { // No se encontro en la cache
      db.getSession(id)
        .then(response => {
          if(response.length > 0){
            client.setex(`sessions/${id}`, 5, JSON.stringify(response));
            res.status(200).json(response); 
          }
          else{
            res.sendStatus(404);   
          }
        })
        .catch(error => {
          res.status(500).json(error)
          console.error(error)
        });
    }
  });
});

router.post('/', expressJoi(schemaPost) ,function(req, res, next){
  db.addSession(req.body)
    .then(response=> {
      if(response.result.ok && response.result.n > 0)
        res.status(201).json(response);
      else
        res.sendStatus(404);
      })
    .catch(error => res.status(500).json(error));
});

router.put('/:id', expressJoi(schemaPut), check_object_id ,function(req, res, next){
  let id = req.params.id;
  delete req.body._id
  db.updateSession(id, req.body)
    .then(response => {
      if(response.result.ok && response.result.n > 0)
        res.sendStatus(204);
      else
        res.sendStatus(404);
    })
    .catch(error => res.status(500).json(error));
});

router.delete('/:id', check_object_id ,function(req,res, next){
  let id = req.params.id;
  db.deleteSession(id)
    .then(response => {
      if(response.result.ok && response.result.n > 0)
        res.sendStatus(204);
      else  
        res.sendStatus(404);   
      })
    .catch(error => res.status(500).json(error));
});

module.exports = router;
