const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

// Route to send reminder email to managers
router.post('/send/reminder/manager', emailController.sendReminderEmail);

// Route to send reminder email to employees
router.post('/send/reminder/employee', emailController.sendReminderEmail);

// Route to send reminder email to trainers
router.post('/send/reminder/trainer', emailController.sendReminderEmail);

module.exports = router;