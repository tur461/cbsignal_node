const { 
    ns,
    d_act,
    p_act,
} = require('../constants');
const { 
    d_store,
    p_store,
    s_store,
} = require('../store');

function listen(socket) {
    socket.on(ns.DEBUG, dat => { 
        let l = [];
        if(dat.action === d_act.LIST)
            l = d_store.dbg_list();
        else if(dat.action === p_act.LIST)
            l = p_store.dbg_list();
        socket.emit(ns.DEBUG, l);
    });

    socket.on(ns.DISCONNECTED, _ => {
        if(s_store.is_doctor(socket.id) && d_store.util.is_connected(socket.id)){
            d_store.util.connected(socket.id).no();
        } else if(s_store.is_patient(socket.id) && p_store.util.is_connected(socket.id)) {
            p_store.util.connected(socket.id).no();
        }
        s_store.rem_from_socket_list(socket.id);
    });
}

const common_handler = {
    listen
}

module.exports = {
    common_handler
}