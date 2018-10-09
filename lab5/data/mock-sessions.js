
const Sessions = [
    {
        id:1,
        date_done: '2018-08-15',
        duration: 90,
        calories: 400,
        fc: 140,
        temperature: 88
    },{
        id:2,
        date_done: '2018-08-15',
        duration: 90,
        calories: 400,
        fc: 140,
        temperature: 88
    },{
        id:3,
        date_done: '2018-08-15',
        duration: 90,
        calories: 400,
        fc: 140,
        temperature: 88
    },{
        id:4,
        date_done: '2018-08-15',
        duration: 90,
        calories: 400,
        fc: 140,
        temperature: 88
    },{
        id:5,
        date_done: '2018-08-15',
        duration: 90,
        calories: 400,
        fc: 140,
        temperature: 88
    },{
        id:6,
        date_done: '2018-08-15',
        duration: 90,
        calories: 400,
        fc: 140,
        temperature: 88
    },{
        id:7,
        date_done: '2018-08-15',
        duration: 85,
        calories: 400,
        fc: 140,
        temperature: 88
    }
];


module.exports = {
    addSession: function (session){
        console.log(Sessions.length);
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
