const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_SERVICE_USER,
                pass: process.env.EMAIL_SERVICE_PASSWORD
            }
        });
    }

    constructEmailContent(template, data) {
        // Load the HTML template and replace placeholders with actual data
        let emailContent = template;
        for (const key in data) {
            const placeholder = `{{${key}}}`;
            emailContent = emailContent.replace(new RegExp(placeholder, 'g'), data[key]);
        }
        return emailContent;
    }

    async sendEmail(to, subject, htmlContent) {
        const emailOptions = {
            from: 'your-email@example.com', // Replace with your email
            to: to,
            subject: subject,
            html: htmlContent,
        };

        try {
            await this.mailService.sendMail(emailOptions);
            console.log(`Email sent to ${to}`);
        } catch (error) {
            console.error(`Failed to send email to ${to}:`, error);
            throw error;
        }
    }

    async sendReminderEmail(to, role, actionUrl) {
        let template;
        let subject;

        switch (role) {
            case 'manager':
                template = await this.loadTemplate('reminder_manager.html');
                subject = 'Reminder for Managers';
                break;
            case 'employee':
                template = await this.loadTemplate('reminder_employee.html');
                subject = 'Reminder for Employees';
                break;
            case 'trainer':
                template = await this.loadTemplate('reminder_trainer.html');
                subject = 'Reminder for Trainers';
                break;
            default:
                template = '<p>Hello, this is a reminder.</p>';
                subject = 'Reminder';
        }

        // Replace {{actionUrl}} in template if present
        const htmlContent = template.replace('{{actionUrl}}', actionUrl);

        // Send email
        await this.transporter.sendMail({
            from: process.env.EMAIL_SERVICE_USER,
            to,
            subject,
            html: htmlContent
        });

        console.log(`Email sent to ${to} with subject "${subject}"`);
    }

    async loadTemplate(templateName) {
        const fs = require('fs');
        const path = require('path');
        const templatePath = path.join(__dirname, '..', 'templates', 'emails', templateName);
        if (fs.existsSync(templatePath)) {
            return fs.readFileSync(templatePath, 'utf8');
        }
        return '<p>Hello, this is a reminder.</p>';
    }

    async loadActionButton(actionUrl) {
        const fs = require('fs').promises;
        const path = require('path');
        const buttonTemplate = await fs.readFile(path.join(__dirname, '../templates/components/action_button.html'), 'utf-8');
        return buttonTemplate.replace('{{actionUrl}}', actionUrl);
    }
}

module.exports = EmailService;