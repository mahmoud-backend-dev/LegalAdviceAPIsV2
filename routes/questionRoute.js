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
  addQueValidator,
  idParamQueValidator,
} = require('../utils/validators/questionValidator');

const {
  addQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
  getSpecificQuestion
} = require('../controller/questionController');

router.route('/')
  .post(
    authMiddleWare,
    allowTo('manager', 'admin'),
    uploadSingleImage('image','Questions'),
    addQueValidator,
    addQuestion
  )
  .get(authMiddleWare, getAllQuestions);

router.route('/:id')
  .get(authMiddleWare, idParamQueValidator, getSpecificQuestion)
  .patch(
    authMiddleWare,
    allowTo('manager', 'admin'),
    uploadSingleImage('image','Questions'),
    idParamQueValidator,
    updateQuestion,
)
  .delete(
    authMiddleWare,
    allowTo('manager', 'admin'),
    idParamQueValidator,
    deleteQuestion,
  )



module.exports = router;