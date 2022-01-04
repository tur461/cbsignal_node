// socket event namespaces
const ns = {
    MSG_FROM_PATIENT: 'msg_from_patient',
    MSG_FROM_DOCTOR: 'msg_from_doctor',
    MSG_FROM_SERVER: 'msg_from_server',
    CONNECTED: 'connection',
    DISCONNECTED: 'disconnect',
    CON_ERR: 'connection_error',
    DEBUG: 'debug',
};

module.exports = {
    ns,
}