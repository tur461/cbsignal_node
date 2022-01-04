const to64 = s => Buffer.from(s, ).toString('base64');
const from64 = s => Buffer.from(s, 'base64').toString('ascii');

module.exports = {
    to64,
    from64,
}