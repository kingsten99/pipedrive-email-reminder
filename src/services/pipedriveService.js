// Use CommonJS exports to match the rest of the project
const fetch = global.fetch || require('node-fetch');

class PipedriveService {
    constructor(apiToken) {
        this.apiToken = apiToken;
        this.baseUrl = 'https://api.pipedrive.com/v1';
    }

    async getUsers() {
        const response = await fetch(`${this.baseUrl}/users?api_token=${this.apiToken}`);
        const data = await response.json();
        return data.data;
    }

    async createActivity(userId, subject, dueDate) {
        const response = await fetch(`${this.baseUrl}/activities?api_token=${this.apiToken}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
                subject: subject,
                due_date: dueDate,
            }),
        });
        const data = await response.json();
        return data.data;
    }

    async getUserById(userId) {
        const response = await fetch(`${this.baseUrl}/users/${userId}?api_token=${this.apiToken}`);
        const data = await response.json();
        return data.data;
    }
}

module.exports = PipedriveService;