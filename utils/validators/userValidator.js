
const { body, param } = require('express-validator');
const validationErrorMiddleWare = require('../../middleware/validatorMiddleware');
const { BadRequest } = require('../../errors');
const User = require('../../models/User');

exports.createAboutMeValidator = [
  param('id')
    .custom(async (val) => {
      const user = await User.findOne({ _id: val, role: 'admin' });
      if (!user)
        throw new BadRequest(`No such user for this id: ${val} or not id for user as admin`)
    }),
  body('name').notEmpty().withMessage('Name required'),
  body('email').notEmpty().withMessage('E-mail required')
    .isEmail().withMessage('E-mail Invalid Format'),
  body('image').custom(async (val, { req }) => {
    if (!req.file)
      throw new BadRequest('Please provide image for you and enctype equal multipart/form-data');
    return true;
  }),
  body('phone').notEmpty().withMessage('Phone required')
    .isMobilePhone('ar-EG').withMessage('Please Invalid format number of egypt'),
  body('aboutMe').notEmpty().withMessage('About me required'),
  body('specializations').notEmpty().withMessage('Specializations required'),
  body('experiences').notEmpty().withMessage('Experiences required'),
  body('qualifications').notEmpty().withMessage('Qualifications required'),
  validationErrorMiddleWare,
];

exports.updateMeValidator = [
  param('id')
    .custom(async (val) => {
      const user = await User.findById(val);
      if (!user)
        throw new BadRequest(`No such user for this id: ${val}`);
      return true;
    }),
  validationErrorMiddleWare,
];


exports.signupValidator = [
  body('name').notEmpty().withMessage('Name required'),
  body('email').notEmpty().withMessage('E-mail required')
    .isEmail().withMessage('E-mail Invalid Format')
    .custom(async (val) => {
      const user = await User.findOne({ email: val });
      if (user)
        throw new BadRequest('E-mail already used choose anthor E-mail');
    }),
  body('password').notEmpty().withMessage('Password required')
    .isLength({ min: 6 }).withMessage('Too short password enter more than 6 characters'),
  validationErrorMiddleWare
];


exports.signupAsAdminValidator = [
  body('name').notEmpty().withMessage('Name required'),
  body('email').notEmpty().withMessage('E-mail required'),
  body('password').notEmpty().withMessage('Password required')
    .isLength({ min: 6 }).withMessage('Too short password enter more than 6 characters'),
  validationErrorMiddleWare
];

exports.loginAsAdminValidator = [
  body('email').notEmpty().withMessage('E-mail required'),
  body('password').notEmpty().withMessage('Password required')
    .isLength({ min: 6 }).withMessage('Too short password enter more than 6 characters'),
  validationErrorMiddleWare
];

exports.loginValidator = [
  body('email').notEmpty().withMessage('E-mail required')
    .isEmail().withMessage('E-mail Invalid Format'),
  body('password').notEmpty().withMessage('Password required'),
  validationErrorMiddleWare,
];

exports.forgetPasswordValidator = [
  body('email').notEmpty().withMessage('E-mail required'),
  validationErrorMiddleWare,
];

exports.verifyResetCodeValidator = [
  body('email').notEmpty().withMessage('E-mail Required'),
  body('resetCode').notEmpty().withMessage('Reset Code Required'),
  validationErrorMiddleWare
];

exports.resetPasswordValidator = [
  body('email').notEmpty().withMessage('E-mail Required'),
  body('newPassword').notEmpty().withMessage('New Password Required')
    .isLength({ min: 6 }).withMessage('Too short password enter more than 6 characters'), 
  validationErrorMiddleWare
];