let data = btoa(JSON.stringify({
    from: 'patient',
    id: btoa('some_patient_id'),
    name: 'shafayat',
    slot: '1',
    doctor_id: btoa('some_doctor_id'),
}));
console.log('query:', data);
var socket = io.connect('http://localhost:8484', {query: `params=${data}`});
socket.on("connect", () => {
    console.log('connected:', socket.id);
});
  
socket.on("disconnect", () => {
    console.log('disconnected:', socket.id);
});

  
socket.on("debug", dat => {
    console.log('debug data:', dat);
});