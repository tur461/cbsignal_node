function Patient() {
    this.socket_id = '';
    this.id =  '';
    this.name = '';
    this.slot = '';
    this.doctor_id = '';
    this.finished = false;
    this.connected = false;
    this.update = function(det) {
        this.socket_id = det.socket_id;
        this.id = det.id;
        this.name = det.name;
        this.doctor_id = det.doctor_id;
        this.connected = det.connected;
    }
}

function Doctor() {
    this.socket_id = '';
    this.id =  '';
    this.name = '';
    this.patient_id_list = [];
    this.finished = false;
    this.connected = false;
    this.update = function(det) {
        this.socket_id = det.socket_id;
        this.id = det.id;
        this.name = det.name;
        this.patient_id_list = det.patient_id_list;
        this.connected = det.connected;
    }
}

module.exports = {
    Patient,
    Doctor,
}