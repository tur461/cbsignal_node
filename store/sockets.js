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

function add(sock, is_patient, id) {
    socket_list.push({
        is_patient: is_patient,
        socket: sock,
        id: id,
    });
}

function rem_from_socket_list(socket_id) {
    socket_list.splice(socket_list.map(s => s.socket.id).indexOf(socket_id), 1);
    console.log(`socket with id: ${socket_id}, removed!`);
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

function get_patient_socket_ids() {
    return socket_list.filter(sock => !sock.is_patient).map(s => s.socket.id);
}

function disconnect(socket_id) {
    let sck = socket_list.filter(sock => sock.socket.id == socket_id);
    sck.length && sck[0].disconnect();
    rem_from_socket_list(socket_id);
}

function disconnect_many(socket_ids) {
    socket_list.forEach(sock => {
        socket_ids.indexOf(sock.socket.id) != -1 &&
        sock.socket.disconnect();
        rem_from_socket_list(sock.socket.id);
    });
}

function send(nsp, socket_id, msg) {
    let sck = socket_list.filter(sock => sock.socket.id == socket_id);
    sck.length && sck[0].emit(nsp, msg);
}

function send_to_many(nsp, socket_ids, msg) {
    socket_list.forEach(sock => {
        if(socket_ids.indexOf(sock.scoket.id) != -1)
            sock.socket.emit(nsp, msg); 
    });
}

function dbg_list() {
    return [...socket_list];
}

const s_store = {
    add,
    send,
    dbg_list,
    is_doctor,
    is_patient,
    disconnect,
    send_to_many,
    disconnect_many,
    get_patient_ids,
    get_patient_socket_ids,
    get_connected_doctor_sockets,
    get_connected_patient_sockets,
}

module.exports = {
    s_store
}