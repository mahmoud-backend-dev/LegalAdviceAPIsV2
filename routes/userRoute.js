const express = require('express');
const router = express.Router();

const { uploadSingleImage } = require('../middleware/uploadImageMiddleWare');


const {
  createAboutMeValidator,
  updateMeValidator,
  signupValidator,
  loginValidator,
  forgetPasswordValidator,
  verifyResetCodeValidator,
  resetPasswordValidator,
  signupAsAdminValidator,
  loginAsAdminValidator
} = require('../utils/validators/userValidator')

const {
  createAboutMe,
  updateAboutMe,
  signup,
  login,
  forgetPassword,
  resetPassword,
  verifyResetCode,
  getAboutMe,
  signupAsAdmin,
  loginAsAdmin
} = require('../controller/userController')

router.patch('/admin/signup', signupAsAdminValidator, signupAsAdmin);
router.post('/admin/login', loginAsAdminValidator, loginAsAdmin);
router.post('/admin/:id', uploadSingleImage('image', 'MyProfile'), createAboutMeValidator, createAboutMe);
router.route('/:id')
  .get(updateMeValidator, getAboutMe)
  .patch(updateMeValidator, uploadSingleImage('image', 'MyProfile'), updateAboutMe);

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);

router.post('/forgetPassword', forgetPasswordValidator, forgetPassword);
router.post('/verifyResetCode', verifyResetCodeValidator, verifyResetCode);
router.post('/resetPassword', resetPasswordValidator, resetPassword);

module.exports = router;