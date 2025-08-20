class EmailService {
    constructor(mailService) {
        this.mailService = mailService;
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
                throw new Error('Invalid role specified');
        }

        const actionButtonHtml = await this.loadActionButton(actionUrl);
        const emailContent = this.constructEmailContent(template, { actionButton: actionButtonHtml });

        await this.sendEmail(to, subject, emailContent);
    }

    async loadTemplate(templateName) {
        // Load the HTML template from the file system
        const fs = require('fs').promises;
        const path = require('path');
        const templatePath = path.join(__dirname, '../templates/emails', templateName);
        return await fs.readFile(templatePath, 'utf-8');
    }

    async loadActionButton(actionUrl) {
        const fs = require('fs').promises;
        const path = require('path');
        const buttonTemplate = await fs.readFile(path.join(__dirname, '../templates/components/action_button.html'), 'utf-8');
        return buttonTemplate.replace('{{actionUrl}}', actionUrl);
    }
}

module.exports = EmailService;