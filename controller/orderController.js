const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');

const Order = require('../models/Order');

// @decs Add Order
// @route POST /api/v1/orders
// @ptotect Protected/User
exports.addOrder = asyncHandler(async (req, res) => {
  req.body.user = req.user._id;
  const order = await Order.create(req.body);
  res.status(StatusCodes.OK).json({ status: "Success", order });
});


// @decs Get All Orders
// @route GET /api/v1/orders
// @ptotect Protected/Admin/Manager
exports.getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ status: "Success", count:orders.length,orders });
});


// @decs Get Specific Orders
// @route GET /api/v1/orders/:id
// @ptotect Protected/Admin/Manager
exports.getSpecificOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  res.status(StatusCodes.OK).json({ status: "Success", order });
});


// @decs Delete Specific Orders
// @route DELETE /api/v1/orders/:id
// @ptotect Protected/Admin/Manager
exports.deleteOrder = asyncHandler(async (req, res) => {
  await Order.findByIdAndRemove(req.params.id);
  res.status(StatusCodes.NO_CONTENT).send();
});