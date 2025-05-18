
const { sendFrameToRoom } = require('../services/stream.service');

exports.broadcastFrame = (req, res) => {
    const { roomId } = req.params;
    const { frameData } = req.body;

    if (!frameData) {
        return res.status(400).json({ message: 'Frame data is required' });
    }

    sendFrameToRoom(roomId, frameData);
    res.status(200).json({ message: `Frame sent to room ${roomId}` });
};
