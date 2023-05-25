const { body, param } = require('express-validator');
const { BadRequest } = require('../../errors');
const validationMiddleWare = require('../../middleware/validatorMiddleware');
const CriminalDictionary = require('../../models/CriminalDictionary');



exports.addcriminalDictionaryValidator = [
  body('title').notEmpty().withMessage('Title Required')
    .isLength({ max: 20 }).withMessage('Too Longer Title Less than 20 character'),
  body('desc').notEmpty().withMessage('Description Required')
    .isLength({ min: 10 }).withMessage('Too Short Description more than 10 character '),
  validationMiddleWare,
];

exports.deleteCriminalDictionaryValidator = [
  param('id').custom(async (val) => {
    const criminalDictionary = await CriminalDictionary.findById(val);
    if (!criminalDictionary)
      throw new BadRequest(`No such ciminal dictionary for this id: ${val}`);
  }),
  validationMiddleWare
]

exports.getCriminalDictionaryValidator = [
  param('id').custom(async (val) => {
    const criminalDictionary = await CriminalDictionary.findById(val);
    if (!criminalDictionary)
      throw new BadRequest(`No such ciminal dictionary for this id: ${val}`);
  }),
  validationMiddleWare
]


