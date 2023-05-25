const { body, param } = require('express-validator');
const { BadRequest } = require('../../errors');
const validationMiddleWare = require('../../middleware/validatorMiddleware');
const Video = require('../../models/Video');


exports.addVideoValidator = [
  body('link').notEmpty().withMessage('Link Video Required'),
  body('title').notEmpty().withMessage('Title Required')
    .isLength({ max: 20 }).withMessage('Too Longer Title Less than 20 character'),
  body('desc').notEmpty().withMessage('Description Required')
    .isLength({ min: 10 }).withMessage('Too Short Description more than 10 character '),
  validationMiddleWare,
];

exports.deleteVideoValidator = [
  param('id').custom(async (val) => {
    const video = await Video.findById(val);
    if (!video)
      throw new BadRequest(`No such video for this id: ${val}`);
  }),
  validationMiddleWare
]

exports.getVideoValidator = [
  param('id').custom(async (val) => {
    const video = await Video.findById(val);
    if (!video)
      throw new BadRequest(`No such video for this id: ${val}`);
  }),
  validationMiddleWare
]


