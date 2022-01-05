const { 
    ns,
    p_type,
    d_type,
    s_p_type,
}                   = require('../constants');
const { 
    s_store,
    p_store,
    d_store,
}                   = require('../store');

function listen(socket) {
    socket.on(ns.MSG_FROM_PATIENT, dat => {
        let doctor_id = '', patient_id = '';
        switch(dat.type) {
            case p_type.ANSWER :
                // yet to be handled;
                patient_id = dat.pid;
                doctor_id = dat.did;
                disconnect_all_duplicate_patients(socket.id);
                emit_to_connected_doctor(doctor_id, dat);
                break;
            default:
                doctor_id = dat.did;
                emit_to_connected_doctor(doctor_id, dat);
        }
    });
}

function disconnect_all_duplicate_patients(socket_id) {
    let sids = p_store.get_socket_ids_with_patient_id(p_store.get_patient_id(socket_id));
    s_store.send_to_many(ns.MSG_FROM_SERVER, sids, {
        from: 'server', for: 'patient', type: s_p_type.WRAP_UP_DISCONNECT
    });
    setTimeout(_ => s_store.disconnect_many(sids), 5000);
}

function emit_to_connected_doctor(doctor_id, dat) {
    s_store.send(ns.MSG_FROM_PATIENT, d_store.get_socket_id(doctor_id), util.ser_en(dat));
}

const patient_handler = {
    listen
}

module.exports = {
    patient_handler
}