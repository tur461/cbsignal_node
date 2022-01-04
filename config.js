const config = {
    socket: {
        cors: {
            origin: "http://localhost:8000",
            methods: ["GET", "POST", "PUT", "DELETE"]
        },
        PORT: 8484,
    }
};

module.exports = {
    config,
}