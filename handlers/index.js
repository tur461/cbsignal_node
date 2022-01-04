const { patient_handler } = require('./patient');
const { doctor_handler } = require('./doctor');
const { common_handler } = require('./common');

module.exports = {
    common_handler,
    doctor_handler,
    patient_handler,
}