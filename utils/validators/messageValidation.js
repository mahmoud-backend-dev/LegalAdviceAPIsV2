const { body, param } = require('express-validator');
const { BadRequest } = require('../../errors');
const validationMiddleWare = require('../../middleware/validatorMiddleware');
const Message = require('../../models/Message');

exports.getSpecificMessageValidator = [
  param('id')
    .custom(async (val) => {
      const message = await Message.findById(val)
      if (!message)
        throw new BadRequest(`No such message for this id: ${val}`)
    }),
  validationMiddleWare,
]