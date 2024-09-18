const express = require('express');
const { getData, exportCSV} = require('../controllers/dataGeneratorController');

const router = express.Router();

router.post('/', getData);
router.post('/export', exportCSV);

module.exports = router;