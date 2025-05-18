const MAX_BITRATE = 5000; 
const MIN_BITRATE = 500;   
const MAX_CLIENTS = 50;    
const roomBitrates = {};   

exports.manageBitrate = (io, roomId, frameData) => {
  
    if (!roomBitrates[roomId]) {
        roomBitrates[roomId] = MAX_BITRATE;
    }

    
    const numClients = io.sockets.adapter.rooms.get(roomId)?.size || 0;

    
    if (numClients > MAX_CLIENTS) {
        console.warn(`⚠️ Room ${roomId} is over capacity.`);
        return;
    }

    
    const adjustedBitrate = Math.max(
        MIN_BITRATE,
        MAX_BITRATE - (numClients * 50)  
    );

    
    roomBitrates[roomId] = adjustedBitrate;

    
    io.to(roomId).emit('video-frame', { frameData, bitrate: adjustedBitrate });

    console.log(`🚀 Streaming to Room ${roomId} | Clients: ${numClients} | Bitrate: ${adjustedBitrate}kbps`);
};
