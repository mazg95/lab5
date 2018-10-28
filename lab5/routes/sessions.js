var express = require('express');
var router = express.Router();
var db = require('../data/db');

const redis = require('redis');
const client = redis.createClient();

// Print redis errors to the console
client.on('error', (err) => {
  console.log("Error " + err);
});

//Campos permitidos
let fields = ['date_done', 'duration', 'calories', 'fc', 'temperature']  

//Funcion para validar el input (require_all es una flag para hacer todos los campos requeridos, o regrese false)
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

router.get('/:id', function(req, res, next){
  let id = req.params.id;
  client.get(`session/${id}`, (err, result) => {
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
            res.status(404).json({messageerr:`No se ha encontrado el recurso con ID: ${id}`});        
          }
        })
        .catch(error => {
          res.status(500).json(error)
          console.error(error)
        });
    }
  });
});

router.post('/', function(req, res, next){
  if(!check_fields(req.body, true)){
    return res.status(400).send('No se especificaron todo los campos requeridos');
  }
  db.addSession(req.body)
    .then(response=> {
      if(response.result.ok)
        res.status(201).json(response);
      else
        res.sendStatus(404);
      })
    .catch(error => res.status(500).json(error));
});

router.put('/:id', function(req, res, next){
  let id = req.params.id;
  delete req.body._id
  check_fields(req.body, false);
  db.updateSession(id, req.body)
    .then(response => {
      if(response.result.ok && response.result.n > 0)
        res.status(204).json({message:`Se ha actualizado el recurso con ID: ${id}`})
      else
        res.sendStatus(404);
    })
    .catch(error => res.status(500).json(error));
});

router.delete('/:id', function(req,res, next){
  let id = req.params.id;
  db.deleteSession(id)
    .then(response => {
      if(response.result.ok && response.result.n > 0)
        res.status(204).json({message:`Se ha eliminado el recurso con ID: ${id}`})
      else  
        res.status(404).json({messageerr:`No se ha encontrado el recurso con ID: ${id}`})
      })
    .catch(error => res.status(500).json(error));
});

module.exports = router;
