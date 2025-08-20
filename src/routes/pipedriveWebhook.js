const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController'); // implement handlePipedriveWebhook

router.post('/webhook', async (req, res) => {
  console.log('Pipedrive webhook received:', JSON.stringify(req.body).slice(0, 1000));
  try {
    // delegate to controller (implement handlePipedriveWebhook) or handle here
    if (emailController && typeof emailController.handlePipedriveWebhook === 'function') {
      await emailController.handlePipedriveWebhook(req.body);
    }
    // respond quickly so Pipedrive considers delivery successful
    res.status(200).send('OK');
  } catch (err) {
    console.error('webhook handler error', err);
    res.status(500).send('ERROR');
  }
});

module.exports = router;