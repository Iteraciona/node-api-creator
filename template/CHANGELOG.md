# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.2.0] - 2026-03-04

### Added
- Professional startup banner with real-time system stats (Process RAM, System RAM, Disk Free, Node version, OS, and Uptime).
- Flexible MongoDB connection flow: non-blocking warning in `DEVELOPMENT` mode and strict enforcement in `PRODUCTION`.
- Early loading of environment variables using `import 'dotenv/config'`.

### Changed
- Migrated environment variables management from `nodemon.json` to `.env` (using `.env.example` as template).
- Standardized `package.json` scripts: `"dev"` for nodemon and `"start"` for standard node execution.
- Improved terminal output with ANSI colors and structured tables for better readability.

### Removed
- `nodemon.json.sample` in favor of a cleaner `.env` based configuration.

---

## [1.1.0] - 2026-03-04

### Changed
- Migrated from `moment`, `moment-timezone`, and `dateformat` to `luxon` for date and time management.
- Updated all dependencies to their latest major/minor versions.
- Moved `nodemon` from `dependencies` to `devDependencies`.
- Updated Winston logger to use `luxon` for localized timestamps (`America/Lima`).

### Security
- Fixed vulnerabilities by updating dependencies and running `npm audit fix`.

---

## [1.0.2] - 2025-06-02

### Added
- Integrated Winston logger with custom formatting and label support.
- Added daily log rotation using `winston-daily-rotate-file`.
- Separated log files into `success-%DATE%.log` and `error-%DATE%.log`.
- Console logging retained for development.
- Timestamp localized to `America/New_York` timezone using `moment-timezone`.

### Fixed
- Graceful handling of `uncaughtException` and `unhandledRejection`, with logging and controlled shutdown (`process.exit(1)`), compatible with PM2 auto-restart.

---

## [1.0.1] - 2025-01-30

### Added
- First stable release of `it-node-api-creator`.

### Features
- MongoDB integration and base schema setup
- JWT authentication system
- Basic error handling
- Nodemon for development auto-reload
- PM2-ready for production deployments
- Scalable and organized folder structure
- CLI: `create-it-api` to scaffold new API projects

---

## [1.0.0] - 2025-01-30

### Initial commit
- Project setup
