import mongoose from 'mongoose';
import { logger } from './logger.js';

const isDev = process.env.ENVIRONMENT === 'DEVELOPMENT';

export function setupMongooseLogger() {
    if (!isDev) return;

    mongoose.set('debug', function (collectionName, method, query, doc, options) {
        logger.info(`Mongoose: ${collectionName}.${method}`, {
            query,
            doc,
            options
        });
    });
}
