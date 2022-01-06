const { 
    d_store,
    p_store,
    s_store
} = require('./');

function get_doctor_socket(doctor_id) {
    return s_store.get_socket(d_store.get_socket_id(doctor_id));
}

function get_patient_socket(patient_id) {
    return s_store.get_socket(p_store.get_socket_id(patient_id));
}

let c_store = {
    get_doctor_socket,
    get_patient_socket,
};

module.exports = {
    c_store,
}