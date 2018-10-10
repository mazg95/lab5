var express = require('express');
var router = express.Router();
var db = require('../data/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(db.getSessions()).end();
});

router.get('/:id', function(req, res, next){
  let id = req.params.id;
  session = db.getSession(id);
  if(session){
    res.json(session);
  }
  else{
    res.statusCode = 404;
    res.json({messageerr:`No se ha encontrado el recurso con ID: ${id}`});
  }
  res.end();
});

router.post('/', function(req, res, next){
  console.log(req.body);
  let new_id = db.addSession(req.body);
  if(new_id>0){
    res.status(201).json({id:new_id});
  } else {
    res.status(404).json({message:"Ha ocurrido un error."});
  }
  res.end();
});

router.put('/:id', function(req, res, next){
  let id = req.params.id;
  if(db.updateSession(id, req.body)){
    res.status(204).json({message:`Se ha actualizado el recurso con ID: ${id}`});
  } else {
    res.status(404).json({message:`No se ha encontrado el recurso con ID: ${id}`});
  }
  res.end();
});

router.delete('/:id', function(req,res, next){
  let id = req.params.id;
  if(db.deleteSession(id)){
    res.status(204).json({message:`Se ha eliminado el recurso con ID: ${id}`});
  } else {
    res.status(404).json({messageerr:`No se ha encontrado el recurso con ID: ${id}`});
  }
  res.end();
});

module.exports = router;
