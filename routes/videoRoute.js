const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middleware/authMiddleware');
const { 
  allowTo
} = require('../controller/userController');


const {
  addVideoValidator,
  deleteVideoValidator,
  getVideoValidator
} = require('../utils/validators/videoValidator');

const {
  addVideo,
  getAllVideo,
  getSpecificVideo,
  removeVideo
} = require('../controller/videoController');





router.route('/')
  .post(authMiddleWare, allowTo('manager', 'admin'), addVideoValidator, addVideo)
  .get(getAllVideo);

router.route('/:id')
  .get(getVideoValidator, getSpecificVideo)
  .delete(
  authMiddleWare, allowTo('manager', 'admin'),
  deleteVideoValidator,
  removeVideo
);

module.exports = router;