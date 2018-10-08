var express = require('express');
var router = express.Router();
var db = require('../data/mock-sessions');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({'message':'hola'});
});

router.get('/:id', function(req, res, next){
  let id = req.params.id;
  session = db.getSession(id);
  if(session){
    res.json(session);
  }
  else{
    res.statusCode = 404;
    res.end();
  }
});

router.post('/', function(req, res, next){
  let new_id = db.addSession(req.body);
  if(new_id>0){
    res.status(201).json({id:new_id});
  } else {
  }
});

router.put('/:id', function(req, res, next){
  let id = req.params.id;
  if(db.updateSession(id, req.body)){
    res.sendstatus(204);
  } else {
    res.status(404);
  }
  res.end();
});

router.delete('/:id', function(req,res, next){
  let id = req.params.id;
  if(db.deleteSession(id)){
    res.status(204);
  } else {
    res.status(404);
  }
  res.end();
});

module.exports = router;
