const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middleware/authMiddleware');
const { 
  allowTo
} = require('../controller/userController');

const {
  getSpecificMessageValidator
} = require('../utils/validators/messageValidation')

const {
  sendMessage,
  getAllMessages,
  getSpecificMessage,
  updateSpecificMessage,
  deleteMessage,
  getMyMessage
} = require('../controller/messageController');
const {  uploadDifferentFile } = require('../middleware/uploadImageMiddleWare');

router.route('/')
  .post(
    authMiddleWare,
    allowTo('user') ,
    uploadDifferentFile([
      { name: 'image', maxCount: 1 },
      { name: 'file', maxCount: 1 }
    ]
      , 'Client'),
    sendMessage
  )
  .get(authMiddleWare,allowTo('manager','admin'),getAllMessages);

router.get('/me', authMiddleWare,allowTo('user'), getMyMessage);

router.route('/:id')
  .get(authMiddleWare,getSpecificMessageValidator, getSpecificMessage)
  .patch(
    authMiddleWare,
    uploadDifferentFile([
      { name: 'image', maxCount: 1 },
      { name: 'file', maxCount: 1 }
    ]
      , 'Client'),
      allowTo('user'),
      getSpecificMessageValidator,
    updateSpecificMessage
  )
  .delete(
    authMiddleWare,
    getSpecificMessageValidator,
    deleteMessage
);



module.exports = router;