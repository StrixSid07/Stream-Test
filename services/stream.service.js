
const { getIoInstance } = require('../sockets/stream.socket');

exports.sendFrameToRoom = (roomId, frameData) => {
    const io = getIoInstance(); 
    if (io) {
        io.to(roomId).emit('video-frame', frameData);
    } else {
        console.error('Socket.io instance not initialized.');
    }
};
