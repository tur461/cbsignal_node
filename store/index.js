const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { d_store } = require('./doctor');
const { p_store } = require('./patient');
const { s_store } = require('./sockets');
const { c_store } = require('./common');

let store_err = {
    db: [],
    oth: [],
};

let db = null;
let db_path = path.resolve(path.join(__dirname, 'db'), 'cbsignal.db');

function init_store() {
    db = new sqlite3.Database(db_path, sqlite3.OPEN_READWRITE, err => {
        if (err) {
            store_err.db.push(err);
            console.error(err.message);
        }
        else console.log('Connected to the cbsignal database.');
    });
}

function save2db(param) { 
    console.log('saving to sqlite databse..');
}


module.exports = {
    init_store,
    save2db,
    d_store,
    p_store,
    s_store,
    c_store,
}