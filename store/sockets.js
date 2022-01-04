let socket_list = [];

function get_sock(id) {
    let socks = socket_list.filter(s => s.socket.id === id);
    return socks[0];
}

function is_patient(id) {
    return get_sock(id).is_patient;
}

function is_doctor(id) {
    return !get_sock(id).is_patient;
}

function add2socket_list(sock, is_patient, id) {
    socket_list.push({
        is_patient: is_patient,
        socket: sock,
        id: id,
    });
}

function rem_from_socket_list(id) {
    socket_list.splice(socket_list.map(s => s.socket.id).indexOf(id), 1);
    console.log(`socket with id: ${id}, removed!`);
}

function get_connected_patient_sockets() {
    return socket_list.filter(sock => sock.is_patient);
}

function get_connected_doctor_sockets() {
    return socket_list.filter(sock => !sock.is_patient);
}

function get_patient_ids() {
    return socket_list.filter(sock => !sock.is_patient).map(s => s.id);
}

const sock_store = {
    is_doctor,
    is_patient,
    add2socket_list,
    rem_from_socket_list,
    get_patient_ids,
    get_connected_doctor_sockets,
    get_connected_patient_sockets,
}

module.exports = {
    sock_store
}