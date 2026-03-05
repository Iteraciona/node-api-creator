# A Template to Start a New Node API Project

This template provides a professional and modern starting point for creating a new Node.js API project. It comes preconfigured with essential tools, a structured module system, and a robust logging and validation layer.

## Key Features

- 🚀 **Professional Startup Banner**: Real-time system stats (RAM, Disk, Uptime) on boot.
- 🛠️ **Environment Management**: Fully integrated with `.env` files.
- 📊 **Modern Logging**: Winston logger with Luxon for precise localized timestamps.
- 🔗 **Database Ready**: Mongoose integration with flexible connection logic (non-blocking in Dev).
- 🛡️ **Security**: Pre-configured with CORS, Rate Limiting, and JWT authentication.
- 🧩 **Modular Structure**: Organized by modules (Controllers, Models, Routes, Services).

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [MongoDB](https://www.mongodb.com/)

## Installation

1. Create a new project using the CLI:
   ```sh
   npx create-it-api my-awesome-project
   ```

2. Enter the directory:
   ```sh
   cd my-awesome-project
   ```

3. Configure your environment:
   ```sh
   # .env is automatically created from .env.example
   nano .env
   ```

## Running the Project

### Development Mode
Auto-restarts on file changes using `nodemon`:
```sh
npm run dev
```

### Production Mode
Standard execution with `node`:
```sh
npm start
```

## Package.json Overview

The `package.json` includes the following modern stack:

### Key Dependencies:
- `express` (v5+) - Fast, unopinionated, minimalist web framework.
- `mongoose` (v9+) - Elegant MongoDB object modeling.
- `express-validator` - Set of express.js middlewares that wraps validator.js.
- `jsonwebtoken` - JWT-based authentication.
- `bcrypt` - Optimized password hashing.
- `cors` - Cross-origin resource sharing.
- `dotenv` - Zero-dependency environment variable loader.
- `winston` - Universal logging library with daily rotation support.

### Development Tools:
- `nodemon` - Auto-restart server on file changes.
- `morgan` - HTTP request logger middleware.
- `multer` - Middleware for handling `multipart/form-data` (file uploads).

### Utilities:
- `luxon` - Powerful and modern library for working with dates and times.
- `lodash` - Modern JavaScript utility library.
- `socket.io` - Real-time, bidirectional and event-based communication.
- `resend` - Email sending integration.
- `uuid` - RFC4122 UUID generation.

## Folder Structure

```
.env
package.json
app.js
db.js
server.js
src/
├── helpers/      # Global utilities (logger, token, etc.)
├── middlewares/  # Express middlewares
├── modules/      # Business logic by module
│   └── home/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       └── services/
└── routes/       # Versioned route entry points
```

## License

This project is licensed under the MIT License.
