const { body, param } = require('express-validator');
const { BadRequest } = require('../../errors');
const validationMiddleWare = require('../../middleware/validatorMiddleware');
const Order = require('../../models/Order');

exports.addOrderValidator = [
  body('reason').notEmpty().withMessage('Reason Required'),
  body('desc').notEmpty().withMessage('Description Required'),
  body('phone').notEmpty().withMessage('Phone Required')
    .isMobilePhone('ar-EG').withMessage('Phone must be format as egypt number'),
  body('date').notEmpty().withMessage('Date Required'),
    //.isDate().withMessage("Invalid Date , enter valid date format as 'YYYY-MM-DD' or 'YYYY/MM/DD' "),
  validationMiddleWare
];

exports.getSpecificValidator = [
  param('id')
    .custom(async (val) => {
      const order = await Order.findById(val)
      if (!order)
        throw new BadRequest(`No such order for this id: ${val}`)
    }),
  validationMiddleWare
]

