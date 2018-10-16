var express = require('express');
var router = express.Router();
var db = require('../data/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.getSessions()
  .then(response => res.status(200).json(response))
  .catch(error => console.error(error));
});

router.get('/:id', function(req, res, next){
  let id = req.params.id;
  db.getSession(id)
    .then(response => {
      if(response.length > 0){
        res.status(200).json(response)
      }
      else{
        res.status(404).json({messageerr:`No se ha encontrado el recurso con ID: ${id}`});        
      }
    })
    .catch(error => {
      res.status(500).json(error)
      console.error(error)
    });
});

router.post('/', function(req, res, next){
  console.log(req.body);
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
  db.updateSession(id, req.body)
    .then(response => {
      console.log(response);
      if(response.result.ok)
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
