const express = require('express');
const emailRoutes = require('./routes/emailRoutes');
const pipedriveWebhookRoutes = require('./routes/pipedriveWebhook');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/emails', emailRoutes);
app.use('/api/pipedrive', pipedriveWebhookRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});