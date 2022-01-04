const { Doctor } = require('./model/store');
let doctor_list = [];
let connected_doctor_and_patient_map = {};
let patient_id_list_per_doctor_map = {};

function _update_if_exists(doctor_id, new_socket_id) {
    for(let i=0, l=doctor_list.length; i<l; ++i)
        if(doctor_list[i].id === doctor_id) {
            doctor_list[i].socket_id = new_socket_id;
            doctor_list[i].connected = !0;
            return !0;
        } 
    return !1;
}

function add(det) {
    if(_update_if_exists(det.id, det.socket_id)) return;
    let doctor = new Doctor();
    doctor.update(det);
    // console.log('doctor:', doctor);
    doctor_list.push(doctor);
    create_entry_in_plpd_map(det.id);
}

function _update_status(socket_id, prop, status) {
    console.log(`[doctor] updating status:: sid: ${socket_id}, prop: ${prop}, status: ${status}`);
    for(let i=0, l=doctor_list.length; i<l; ++i)
        if(doctor_list[i].socket_id === socket_id) {
            doctor_list[i][prop] = status;
            break;
        }
}

function _get_status(socket_id, prop) {
    let status = !1;
    for(let i=0, l=doctor_list.length; i<l; ++i)
        if(doctor_list[i].socket_id === socket_id) {
            status = doctor_list[i][prop];
            break;
        }
    console.log(`[doctor] getting status:: sid: ${socket_id}, prop: ${prop}, status: ${status}`);
    return status;
}


class Util {
    constructor(){
        let _connected_no = socket_id => _update_status(socket_id, 'connected', !1);
        let _connected_yes = socket_id => _update_status(socket_id, 'connected', !0);
        let _finished_no = socket_id => _update_status(socket_id, 'finished', !1);
        let _finished_yes = socket_id => _update_status(socket_id, 'finished', !0);
    
        this.is_connected = socket_id => _get_status(socket_id, 'connected');
        this.is_finished = socket_id => _get_status(socket_id, 'finished');
    
        this._socket_id = '';
        this._prefix = '';
        
        this.connected = function(socket_id) {
            this._socket_id = socket_id;
            this._prefix = '_connected_'
            return this;
        };
    
        this.finished = function(socket_id) {
            this._socket_id = socket_id;
            this._prefix = '_finished_'
            return this;
        };
    
        this.no = function() {
            eval(`${this._prefix}no(this._socket_id)`);
        }
        this.yes = function() {
            eval(`${this._prefix}yes(this._socket_id)`);
        }
    }
}

function get_doctor_id(socket_id) {
    for(let i=0, l=doctor_list.length; i<l; ++i)
        if(doctor_list[i].socket_id === socket_id)
            return doctor_list[i].id;
    return '';
}

function get_socket_id(doctor_id) {
    for(let i=0, l=doctor_list.length; i<l; ++i)
        if(doctor_list[i].id === doctor_id)
            return doctor_list[i].socket_id;
    return '';
}

function add_to_cdp_map(op) {
    let doctor_id = get_doctor_id(op.socket_id);
    if(connected_doctor_and_patient_map[doctor_id]) return !0;
    connected_doctor_and_patient_map[doctor_id] = op.patient_id;
    return !1;
}

function rem_from_cdp_map(socket_id) {
    let doctor_id = get_doctor_id(socket_id);
    delete connected_doctor_and_patient_map[doctor_id];
}

function get_connected_patient_id(socket_id) {
    let doctor_id = get_doctor_id(socket_id);
    return connected_doctor_and_patient_map[doctor_id];
}

function create_entry_in_plpd_map(doctor_id) {
    patient_id_list_per_doctor_map[doctor_id] = [];
}

function update_plpd_map(socket_id, patient_id_list) {
    patient_id_list_per_doctor_map[get_doctor_id(socket_id)] = patient_id_list;
}

function get_patient_list(socket_id) {
    return patient_id_list_per_doctor_map[get_doctor_id(socket_id)];
}

function dbg_list() {
    return doctor_list;
}

const d_store = {
    add,
    util: new Util,
    dbg_list,
    add_to_cdp_map,
    rem_from_cdp_map,
    get_doctor_id,
    get_socket_id,
    get_connected_patient_id,
    update_plpd_map,
    get_patient_list,
}

module.exports = {
    d_store,
}