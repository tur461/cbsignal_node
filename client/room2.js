function getToken() {
    let token = '', a = Array.from('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
    for(let i=0; i<32; ++i)
        token += a[Math.ceil(Math.random() * 62)]
    return token;
}
let dat = {
    from: 'patient',
    id: '123456',
    name: 'patient 1',
    // pids: ['0', '1'],
    // slots: ['12:00-12:15', '13:45-14:00']
};
let room_id = '00000000000000000000000000000002',
    token = btoa(getToken()),
    data = btoa(JSON.stringify(dat));
let url = `ws://127.0.0.1:8484/cb/${room_id}/${token}/${data}`;
console.log('url:', url);
let ws = new WebSocket(url);
let uuid = '';
ws.onopen = d => {
    console.log('connection opened', d);
}

ws.onerror = (e, er) => {
    console.log('ws connection error', e, er);
}

ws.onclose = d => {
    console.log('connection closed', d);
}

ws.onmessage = d => {
    console.log('message on ws connection', d.data);
    let dd = '' + d.data;
    if(dd.indexOf('your id is') != -1){
        uuid = dd.split(' ')[3];
    }
}
