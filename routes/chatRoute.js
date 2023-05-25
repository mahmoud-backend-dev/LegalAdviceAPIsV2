const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middleware/authMiddleware');


const {
  getUserMsgValidator,
} = require('../utils/validators/chatValidator')

const {
  getAllMessagesOfChat
} = require('../controller/chatController')


router.get('/messages/:id', authMiddleWare, getUserMsgValidator, getAllMessagesOfChat);



module.exports = router