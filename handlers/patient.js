const { 
    ns,
    p_type,
}                   = require('../constants');

function listen(socket) {
    socket.on(ns.MSG_FROM_PATIENT, dat => {
        switch(dat.type) {
            case p_type.ANSWER :
                // yet to be handled;
                break;
            default:
                // not handled yet
        }
    });
}


const patient_handler = {
    listen
}

module.exports = {
    patient_handler
}