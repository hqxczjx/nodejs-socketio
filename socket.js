var io = require('socket.io')();

io.sockets.on('connection', function (socket) {
    console.log('welcome! to connection');
    var userInfo = '',
    userBrowser = '',
    msg = '';
    socket.on('userInfo', function (data) {
        // socket.emit('msg', {userInfo: data});
        // socket.broadcast.emit('userInfo', {userInfo: data});
        userInfo = JSON.parse(data);
    });
    socket.on('userBrowser', function (data) {
        // socket.emit('userBrowser', {userBrowser: data});
        // socket.broadcast.emit('userBrowser', {userBrowser: data});
        userBrowser = data;
        console.log(userBrowser);
    });
    socket.on('msg', function (data) {
        socket.emit('msg', {msg: '你说:' + data.msg});
        let info = '来自' + userInfo.city + '的' + userInfo.ip + userBrowser + '说:' + data.msg;
        socket.broadcast.emit('msg', {msg: info});
    });
});

exports.listen = function (_server) {
    return io.listen(_server);
};