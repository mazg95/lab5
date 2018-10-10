var Sessions = require('./sessions').Sessions;

module.exports = {
    addSession: function (session){
        console.log(session);
        if(Sessions.length){
            session.id = Sessions[Sessions.length - 1].id + 1
        }
        else{
            session.id = 1;
        }
        Sessions.push(session);
        return session.id;
    }, 
    
    deleteSession: function(id){
        console.log(`Eliminando Servicio: ${id}`);
        let index = Sessions.findIndex(s => s.id == id);
        if(index < 0){
            return false;
        }
    
        Sessions.splice(index, 1);
        return true;
    },
    
    
    updateSession: function (id, session){
        console.log(`Actualizando Servicio: ${id}`);
        let index = Sessions.findIndex(s => s.id == id);
        if(index < 0){
            return false;
        }
    
        Sessions.splice(index, 1, session);
        return true;
    },
    
    getSession: function (id){
        console.log("GETTING ID:" + id);
        return Sessions.find(x => x.id == id);
    },
    
    getSessions: function (){
        return Sessions;
    }
}
