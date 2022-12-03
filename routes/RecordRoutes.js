const router = require('express').Router();
const Complaint = require('../controllers/RecordController');
const checkAdmin = require('../middleware/adminCheck');
const checkToken = require('../middleware/auth');



module.exports = router;