# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.2.0] - 2026-03-04

### Changed
- Modernized core dependencies: `express@^4.21.2`, `mongoose@^8.10.1`, `winston@^3.17.0`.
- Replaced `moment`, `moment-timezone`, and `dateformat` with `luxon`.
- Replaced `node-fetch` with native Node.js `fetch`.
- Moved `nodemon` to `devDependencies`.
- Updated Logger to use `luxon` for timestamps with `America/Lima` timezone.

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
