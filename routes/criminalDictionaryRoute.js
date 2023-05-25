const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middleware/authMiddleware');
const { 
  allowTo
} = require('../controller/userController');
const {
  addcriminalDictionaryValidator,
  deleteCriminalDictionaryValidator,
  getCriminalDictionaryValidator,
} = require('../utils/validators/criminalDictionaryValidator');

const {
  addCriminalDictionary,
  getAllCriminalDictionary,
  removeCriminalDictionary,
  getSpecificCriminalDictionary
} = require('../controller/criminalDictionaryController');





router.route('/')
  .post(authMiddleWare, allowTo('manager', 'admin'), addcriminalDictionaryValidator, addCriminalDictionary)
  .get(getAllCriminalDictionary);

router.route('/:id')
  .get(getCriminalDictionaryValidator, getSpecificCriminalDictionary)
  .delete(
  authMiddleWare, allowTo('manager', 'admin'),
  deleteCriminalDictionaryValidator,
  removeCriminalDictionary
);



module.exports = router;