import { logger } from './src/helpers/logger.js';

process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception', {
        message: err.message,
        stack: err.stack,
    });
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection', {
        message: reason instanceof Error ? reason.message : String(reason),
        stack: reason instanceof Error ? reason.stack : null,
    });
});
