const { body, param } = require('express-validator');
const { BadRequest } = require('../../errors');
const validationMiddleWare = require('../../middleware/validatorMiddleware');
const Question = require('../../models/Question');

exports.addQueValidator = [
  body('image')
    .custom(async (val, { req }) => {
      if (!req.file)
        throw new BadRequest('Please provide image for question and enctype equal multipart/form-data')
    }),
  body('title').notEmpty().withMessage('Title Requied'),
  body('subTitle').isArray().withMessage('Sub Title must be an array of object has two key question and answer '),
  body('subTitle.*.question').notEmpty().withMessage('Question Required'),
  body('subTitle.*.answer').notEmpty().withMessage('Answer Required'),
  validationMiddleWare,
]


exports.idParamQueValidator = [
  param('id').custom(async (val) => {
    const question = await Question.findById(val);
    if (!question)
      throw new BadRequest(`No such question for this id: ${val}`);
  }),
  validationMiddleWare,
]