const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middleware/authMiddleware');
const { 
  allowTo
} = require('../controller/userController');

const {
  addOrderValidator,
  getSpecificValidator,
} = require('../utils/validators/orderValidator');

const {
  addOrder,
  getAllOrders,
  getSpecificOrder,
  deleteOrder
} = require('../controller/orderController');

router.route('/')
  .post(authMiddleWare, allowTo('user'), addOrderValidator, addOrder)
  .get(authMiddleWare, allowTo('manager', 'admin'), getAllOrders);


router.route('/:id')
  .get(authMiddleWare, allowTo('manager', 'admin'), getSpecificValidator, getSpecificOrder)
  .delete(authMiddleWare, allowTo('manager', 'admin'), getSpecificValidator, deleteOrder);


module.exports = router;