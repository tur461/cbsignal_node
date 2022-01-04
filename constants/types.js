const d_type = {
    CURRENT_PID_UPDATE: 'update_curr_pid', // pid
    NOTIFICATION: 'notification',
    PID_LIST_UPDATE: 'update_list',
    HANGUP: 'hangup', // did
    RTC_CANDIDATE: 'cadidate', // cadidate, did, pid
    OFFER: 'offer', // description, did, pid, docname
    OTHER: 'other',
    LIVE_ACK: 'living_ack',
}

const p_type = {
    RTC_CANDIDATE: 'cadidate', // did & pid
    ANSWER: 'answer', // description, did, pid
    NO_ANSWER: 'no_answer',
    CALL_DROP: 'call_drop', // did, pid
    LIVE_ACK: 'living_ack',
}

const s_d_type = {
    PATIENT_AVAILABLE: 'patient_available',
    PATIENT_DISCONNECTED: 'patient_disconnected',
    ANY_PATIENT: 'any_patient',
    PATIENT_ID_UPDATED_ACK: 'ack_pid_updtd',
    ACKNOWLEDGEMENT: 'Ack',
    CONNECTION: 'connection',
    LIVE_SYN: 'living_syn',
    SAFE_DISCONNECT: 'safe_disconnect',
}

const s_p_type = {
    DOCTOR_AVAILABLE: 'doctor_available',
    DOCTOR_DISCONNECTED: 'doctor_disconnected',
    CONNECTION: 'connection',
    LIVE_SYN: 'living_syn',
    WRAP_UP_DISCONNECT: 'wrapup_and_disconnect',
}

module.exports = {
    d_type,
    p_type,
    s_d_type,
    s_p_type,
}



