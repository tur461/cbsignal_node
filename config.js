const origin = [
    'http://localhost:8000',
    'https://amshmcb.xyz',
];

const config = {
    socket: {
        cors: {
            origin: origin[1],
            methods: ['GET', 'POST', 'PUT', 'DELETE']
        },
        PORT: 8484,
    }
};

module.exports = {
    config,
}