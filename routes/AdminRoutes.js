const router = require('express').Router();
const Complaint = require('../controllers/AdminController');
const checkAdmin = require('../middleware/adminCheck');

router.post('/dashboard', checkAdmin, Complaint.dashboard);

module.exports = router;