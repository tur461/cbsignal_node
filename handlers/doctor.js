const { util }      = require('../utils');
const { 
    d_store, 
    s_store 
}                   = require('../store');
const { 
    ns,
    d_act,
    d_type,
}                   = require('../constants');


function listen(socket) {
    socket.on(ns.MSG_FROM_DOCTOR, dat => {
        switch(dat.type) {
            case d_type.CURRENT_PID_UPDATE :
                if(dat.action === d_act.ADD)
                    if(d_store.add_to_cdp_map({
                        socket_id: socket.id,
                        patient_id: dat.pid,
                    })) msg = 'Already added!';
                    else msg = 'Added!';
                else if(dat.action === d_act.REM) {
                    d_store.rem_from_cdp_map(socket.id);
                    msg = 'Removed!';
                }
                // to self
                socket.emit(ns.MSG_FROM_SERVER, util.ser_en({
                    from: 'server', for: 'doctor', type: d_type.CURRENT_PID_UPDATE, msg: msg,
                }))
                break;
            case d_type.NOTIFICATION :
                emit_to_connected_patient(socket, dat.uid, dat);
                break;
            case d_type.PID_LIST_UPDATE :
                let patient_id_list = dat.pids;
                d_store.update_plpd_map(socket.id, patient_id_list);
                notify_doctor_about_connected_patients(socket);
                socket.emit(ns.MSG_FROM_SERVER, util.ser_en({
                    from: 'server',
                    for: 'doctor',
                    type: 'Ack',
                    msg: 'List Updated Successfully'
                }));
                break;
            case d_type.OFFER :
                emit_to_connected_patient(socket, null, dat);
                break;
            case d_type.OTHER :
                emit_to_connected_patient(socket, null, dat);
                break;
            default:
                emit_to_connected_patient(socket, null, dat);
        }
    });
}

function emit_to_connected_patient(socket, patient_id, dat) {
    if(patient_id == null) patient_id = d_store.get_connected_patient_id(socket.id)
    c_store.get_patient_socket(patient_id).emit(ns.MSG_FROM_DOCTOR, util.ser_en(dat));
}

function notify_doctor_about_connected_patients(socket) {
    let patient_ids = d_store.get_patient_list(socket.id),
        connected_patient_ids = s_store.get_patient_ids();
    for (id of patient_ids) {
        if(connected_patient_ids.includes(id))
            socket.emit(ns.MSG_FROM_SERVER, util.ser_en({
                from: 'server',
                for: 'doctor',
                type: 'patient_available',
                pid: id
            }));
    }

}

const doctor_handler = {
    listen
}

module.exports = {
    doctor_handler
}