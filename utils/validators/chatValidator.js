const { param } = require('express-validator');
const { BadRequest } = require('../../errors');
const validationMiddleWare = require('../../middleware/validatorMiddleware');
const Chat = require('../../models/Chat');

exports.getUserMsgValidator = [
  param('id').custom(async (val) => {
    const message = await Chat.findOne({ sender: val });
    if (!message)
      throw new BadRequest(`No Such Message for this id: ${val}`);
  }),
  validationMiddleWare
]


exports.getAdminMsgValidator = [
  param('id').custom(async (val) => {
    const message = await Chat.findOne({ recipient: val });
    if (!message)
      throw new BadRequest(`No Such Message for this id: ${val}`);
  }),
  validationMiddleWare
]