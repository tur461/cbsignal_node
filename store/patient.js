const { Patient } = require('./model/store');
let patient_list = [];

function _update_if_exists(id, new_sid) {
    for(let i=0, l=patient_list.length; i<l; ++i)
        if(patient_list[i].id === id) {
            patient_list[i].socket_id = new_sid;
            patient_list[i].connected = !0;
            return !0;
        } 
    return !1;
}

function add(det) {
    if(_update_if_exists(det.id, det.socket_id)) return;
    let patient = new Patient();
    patient.update(det);
    patient_list.push(patient);
}

function update_doctor_id_of_patient(patient_id, doctor_id) {
    for(let i=0, l=patient_list.length; i<l; ++i)
        if(patient_list[i].id === patient_id)
            patient_list[i].doctor_id = doctor_id;
}

function _update_status(socket_id, prop, status) {
    console.log(`[patient] updating status:: sid: ${socket_id}, prop: ${prop}, status: ${status}`);
    for(let i=0, l=patient_list.length; i<l; ++i)
        if(patient_list[i].socket_id === socket_id) {
            patient_list[i][prop] = status;
            break;
        }
}

function _get_status(socket_id, prop) {
    let status = !1;
    for(let i=0, l=patient_list.length; i<l; ++i)
        if(patient_list[i].socket_id === socket_id){
            status = patient_list[i][prop];
            break;
        }
    console.log(`[patient] getting status:: sid: ${socket_id}, prop: ${prop} status: ${status}`);
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

function get_patient_id(socket_id) {
    for(let i=0, l=patient_list.length; i<l; ++i)
        if(patient_list[i].socket_id === socket_id)
            return patient_list[i].id;
    return '';
}

function get_socket_id(patient_id) {
    for(let i=0, l=patient_list.length; i<l; ++i)
        if(patient_list[i].id === patient_id)
            return patient_list[i].socket_id;
    return '';
}

function get_socket_ids_with_patient_id(patient_id) {
    return patient_list
            .filter(pat => pat.id === patient_id)
            .map(pat => pat.socket_id);
}

function update_doctor_id(patient_ids, doctor_id) {
    for(let i=0, l=patient_list.length; i<l; ++i)
        if(patient_ids.indexOf(patient_list[i].id) != -1)
            patient_list[i].doctor_id = doctor_id;
}

function dbg_list() {
    return [...patient_list];
}

const p_store = {
    add,
    util: new Util(),
    dbg_list,
    get_socket_id,
    get_patient_id,
    update_doctor_id,
    // update_doctor_id_of_patient,
    get_socket_ids_with_patient_id,
}

module.exports = {
    p_store
}