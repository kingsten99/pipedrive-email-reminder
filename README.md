# Pipedrive Email Reminder

This project is designed to send reminder emails to Managers, Employees, and Trainers using the Pipedrive API. The emails include action buttons that allow users to navigate directly to the application without requiring a login.

## Project Structure

```
pipedrive-email-reminder
├── src
│   ├── app.js                     # Entry point of the application
│   ├── routes
│   │   └── emailRoutes.js         # Routes for sending reminder emails
│   ├── controllers
│   │   └── emailController.js      # Logic for composing and sending emails
│   ├── services
│   │   ├── emailService.js         # Methods for constructing and sending emails
│   │   ├── pipedriveService.js     # Interacts with the Pipedrive API
│   │   └── authService.js          # Handles authentication logic
│   ├── templates
│   │   ├── emails
│   │   │   ├── reminder_manager.html # HTML template for managers
│   │   │   ├── reminder_employee.html # HTML template for employees
│   │   │   └── reminder_trainer.html  # HTML template for trainers
│   │   └── components
│   │       └── action_button.html   # HTML for action button component
│   ├── middleware
│   │   └── verifyToken.js           # Middleware for token verification
│   └── utils
│       ├── token.js                 # Utility functions for token management
│       └── logger.js                # Utility functions for logging
├── config
│   └── default.json                 # Configuration settings
├── .env.example                     # Example environment variables
├── package.json                     # npm configuration file
└── README.md                        # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd pipedrive-email-reminder
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on the `.env.example` file and fill in the required environment variables.

## Usage

1. Start the application:
   ```
   npm start
   ```

2. Use the defined routes to send reminder emails to the respective users.

## Features

- Sends reminder emails to Managers, Employees, and Trainers.
- Includes action buttons in emails that redirect users to the application without requiring a login.
- Utilizes Pipedrive API for user data management.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.