const debug = (label, obj) => {
  try { console.log(label, JSON.stringify(obj).slice(0, 1000)); } catch (e) { console.log(label, obj); }
}

const PipedriveService = require('../services/pipedriveService');
const emailService = require('../services/emailService');
const pipedrive = new PipedriveService(process.env.PIPEDRIVE_API_TOKEN);

class EmailController {
    constructor(emailService, pipedriveService) {
        this.emailService = emailService;
        this.pipedriveService = pipedriveService;
    }

    async sendReminderEmail(req, res) {
        const { userType, userId } = req.body;

        try {
            const userData = await this.pipedriveService.getUserData(userId);
            const emailTemplate = this.getEmailTemplate(userType);
            const emailContent = this.emailService.constructEmailContent(emailTemplate, userData);

            await this.emailService.sendEmail(userData.email, emailContent);
            res.status(200).json({ message: 'Reminder email sent successfully.' });
        } catch (error) {
            console.error('Error sending reminder email:', error);
            res.status(500).json({ message: 'Failed to send reminder email.' });
        }
    }

    getEmailTemplate(userType) {
        switch (userType) {
            case 'manager':
                return 'reminder_manager.html';
            case 'employee':
                return 'reminder_employee.html';
            case 'trainer':
                return 'reminder_trainer.html';
            default:
                throw new Error('Invalid user type');
        }
    }
}

module.exports = {
  EmailController,
  // POST /api/emails/send/reminder/...
  sendReminderEmail: async (req, res) => {
    try {
      const payload = req.body || {};
      debug('sendReminderEmail payload:', payload);

      if (!payload.to) {
        return res.status(400).json({ success: false, message: 'Missing "to" in request body' });
      }

      // TODO: call emailService.sendReminderEmail(...) once implemented
      // const emailService = require('../services/emailService');
      // await emailService.sendReminderEmail({ to: payload.to, ... });

      return res.status(200).json({ success: true, message: 'Reminder request received (stub)' });
    } catch (err) {
      console.error('sendReminderEmail error', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  // Handler invoked by webhook router. Called with req.body in current router.
  // Implement fetching full object via PipedriveService and triggering emails here.
  handlePipedriveWebhook: async (body) => {
    // Get deal info from webhook payload
    const deal = body?.data;
    if (!deal) return;

    // Get owner info (you may need to fetch user details if you want their email)
    const ownerId = deal.owner_id;
    let ownerEmail = null;

    // Fetch owner details from Pipedrive API
    if (ownerId) {
      const owner = await pipedrive.getUserById(ownerId);
      ownerEmail = owner?.email;
    }

    // Send email if owner email is found
    if (ownerEmail) {
      await emailService.sendReminderEmail({
        to: ownerEmail,
        subject: `New Deal Created: ${deal.title}`,
        templateName: 'reminder_manager.html',
        context: { name: deal.title }
      });
      console.log(`Email sent to ${ownerEmail} for deal "${deal.title}"`);
    } else {
      console.log('No owner email found for deal:', deal.title);
    }
  }
};