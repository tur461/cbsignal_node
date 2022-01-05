const { 
    patient_handler, 
    doctor_handler 
} = require('.');
const { 
    ns,
    d_act,
    p_act,
    s_p_type,
    s_d_type,
} = require('../constants');
const { 
    d_store,
    p_store,
    s_store,
} = require('../store');

function listen(socket) {
    socket.on(ns.DEBUG, dat => { 
        let l = [];
        if(dat.action === d_act.LIST)
            l = d_store.dbg_list();
        else if(dat.action === p_act.LIST)
            l = p_store.dbg_list();
        socket.emit(ns.DEBUG, l);
    });

    socket.on(ns.DISCONNECTED, _ => {
        if(s_store.is_doctor(socket.id) && d_store.util.is_connected(socket.id)){
            doctor_handler.notify_connected_patients_about_doctor(socket.id, s_p_type.DOCTOR_DISCONNECTED, 'offline');
            d_store.util.connected(socket.id).no();
        } else if(s_store.is_patient(socket.id) && p_store.util.is_connected(socket.id)) {
                doctor_handler.notify_doctor_about_patient(socket.id, s_d_type.PATIENT_DISCONNECTED);
                p_store.util.connected(socket.id).no();
        }
        s_store.disconnect(socket.id);
    });
}

const common_handler = {
    listen
}

module.exports = {
    common_handler
}