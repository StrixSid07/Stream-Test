const { manageBitrate } = require('../utills/bitrateManager');
const MAX_CLIENTS = 50;
const roomHosts = {}; 
exports.handleSocketEvents = (io) => {
    io.on('connection', (socket) => {
        console.log(`🟢 Client connected: ${socket.id}`);

      
        socket.on('host-connect', (roomId) => {
            if (!roomHosts[roomId]) {
                roomHosts[roomId] = socket.id;
                socket.join(roomId);
                io.to(roomId).emit('host-connected', { message: `Host connected to room ${roomId}` });
                console.log(`🟢 Host connected: ${socket.id} to room: ${roomId}`);
            }
        });

       
        socket.on('join-room', (roomId) => {
            if (!roomHosts[roomId]) {
                socket.emit('host-not-connected', { message: 'Host is not connected.' });
            } else {
                const numClients = io.sockets.adapter.rooms.get(roomId)?.size || 0;
                if (numClients >= MAX_CLIENTS) {
                    socket.emit('room-full', { message: `Room ${roomId} is full.` });
                } else {
                    socket.join(roomId);
                    socket.emit('joined-room', { message: `Successfully joined room ${roomId}` });
                    console.log(`Client ${socket.id} joined room: ${roomId}`);
                }
            }
        });

       
        socket.on('video-frame', (data) => {
            if (data.roomId && data.frame) {
              
                manageBitrate(io, data.roomId, data.frame);
            }
        });

       
        socket.on('disconnect', () => {
            Object.keys(roomHosts).forEach((roomId) => {
                if (roomHosts[roomId] === socket.id) {
                    delete roomHosts[roomId];
                    io.to(roomId).emit('host-disconnected', { message: 'Host has disconnected.' });
                    console.log(`🔴 Host disconnected from room: ${roomId}`);
                }
            });
            console.log(`🔴 Client disconnected: ${socket.id}`);
        });
    });
};
