const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middleware/authMiddleware');
const { 
  allowTo
} = require('../controller/userController');
const {
  uploadSingleImage
} = require('../middleware/uploadImageMiddleWare')

const {
  addNewValidator,
  getSpecificNewValidator,
} = require('../utils/validators/newValidator')

const {
  addNew,
  updateNew,
  getSpecificNew,
  getAllNews,
  deleteSpecificNew
} = require('../controller/newController')
  
  
router.route('/')
  .post(
    authMiddleWare,
    allowTo('manager', 'admin'),
    uploadSingleImage('image', 'News'),
    addNewValidator,
    addNew
  )
  .get(getAllNews);

router.route('/:id')
  .patch(
    authMiddleWare,
    allowTo('manager', 'admin'),
    getSpecificNewValidator,
    uploadSingleImage('image', 'News'),
    updateNew
  )
  .get(
    getSpecificNewValidator,
    getSpecificNew,
)
  .delete(
    authMiddleWare,
    allowTo('manager', 'admin'),
    getSpecificNewValidator,
    deleteSpecificNew,
  )
  

module.exports = router;