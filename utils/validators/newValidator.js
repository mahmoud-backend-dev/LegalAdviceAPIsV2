const { body, param } = require('express-validator');
const { BadRequest } = require('../../errors');
const validationMiddleWare = require('../../middleware/validatorMiddleware');
const New = require('../../models/New');

exports.addNewValidator = [
  body('title').notEmpty().withMessage('Title Required')
    .isLength({ max: 20 }).withMessage('Too Longer Title Less than 20 character'),
  body('desc').notEmpty().withMessage('Description Required')
    .isLength({ min: 10 }).withMessage('Too Short Description more than 10 character '),
  body('image').custom(async (val, { req }) => {
    if (!req.file)
      throw new BadRequest('Please provide image for you and enctype equal multipart/form-data');
    return true;
  }),
  validationMiddleWare,
];



exports.getSpecificNewValidator = [
  param('id').custom(async (val) => {
    const getNew = await New.findById(val);
    if (!getNew)
      throw new BadRequest(`No such new for this id: ${val}`);
  }),
  validationMiddleWare
]
