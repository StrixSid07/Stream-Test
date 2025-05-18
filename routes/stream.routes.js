
const express = require('express');
const router = express.Router();
const { broadcastFrame } = require('../controllers/stream.controller'); 

router.post('/broadcast/:roomId', broadcastFrame);

module.exports = router;
