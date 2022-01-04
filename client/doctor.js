let data = {
    from: 'doctor',
    name: 'aqeel',
    id: btoa('some_doctor_id'),
    pids: [btoa('some_patient_id')],
    slots: ['1'],
};
let p = btoa(JSON.stringify(data));
console.log('params:', p);
var socket = io.connect('http://localhost:8484', {query: `params=${p}`});
socket.on("connect", () => {
    console.log('connected:', socket.id);
});
  
socket.on("disconnect", () => {
    console.log('disconnected:', socket.id);
});

  
socket.on("debug", dat => {
    console.log('debug data:', dat);
});

