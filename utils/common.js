const { to64, from64 } = require('./strings');

function ser_en(obj) {
    return to64(JSON.stringify(obj));
}

function dec_des(str) {
    return JSON.parse(from64(str));
}

module.export = {
    ser_en,
    dec_des,
}