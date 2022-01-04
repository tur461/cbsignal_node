const { 
    Server, Socket 
} = require('socket.io');
const { 
    config 
} = require('./config');
const {
    common_handler,
    doctor_handler,
    patient_handler,
} = require('./handlers');
const { 
    init_store, 
    d_store, 
    p_store,
    s_store,
    c_store,
} = require('./store');
const {
    to64, from64,
} = require('./utils');
const {
    ns,
} = require('./constants');


const io = new Server({
    cors: config.socket.cors
});

function init_server(options) {
    console.log('server initiation..');
    init_store();
    io.on(ns.CONNECTED, socket => {
        let parsed = parse_socket(socket);
        if(parsed.valid){
            handle_parsed(parsed);
            listen2all_event(socket);
        }            
        else {
            socket.disconnect();
            console.log('not a valid connection. problem:', parsed.problem);
        } 
    });
    
    io.on(ns.CON_ERR, socket => {
        console.log('connection error:', socket.id);
    });
    
    console.log(`listening on port: ${config.socket.PORT}`);
    io.listen(config.socket.PORT);
}

function parse_socket(socket) {
    let parsed = {
        valid: false,
        problem: '',
        from: '',
        data: {},
    }, t = {};

    try {
        t = JSON.parse(from64(socket.handshake.query.params));
        if(t.from === 'patient' || t.from === 'doctor') {
            parsed.from = t.from;
            parsed.data = t;
            parsed.valid = true;
            parsed.socket_id = socket.id;
            // add the socket to list
            s_store.add2socket_list(
                socket, 
                t.from === 'patient' ? !0 : !1,
                t.id);
        } else {
            parsed.valid = false;
            parsed.problem = 'query parameters invalid!';    
        }
    }
    catch (er) {
        parsed.valid = false;
        parsed.problem = er + '';
    }

    return parsed;
}

function handle_parsed(parsed) {
    // console.log('handling parsed data... Data:', parsed.socket_id);
    let det = {};
    det.socket_id = parsed.socket_id;
    det.id = parsed.data.id;
    det.name = parsed.data.name;
    det.connected = true;
    if(parsed.data.from === 'doctor'){
        det.patient_id_list = parsed.data.pids;
        d_store.add({...det});
    } else if(parsed.data.from === 'patient'){
        det.doctor_id = parsed.data.doctor_id
        det.slot = parsed.data.slot;
        p_store.add({...det});
    }
}

function listen2all_event(socket) {
    common_handler.listen(socket);
    doctor_handler.listen(socket);
    patient_handler.listen(socket);
}

module.exports = {
    init_server,
}