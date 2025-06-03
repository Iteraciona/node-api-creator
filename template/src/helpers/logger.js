import { createLogger, format, transports } from 'winston';
import moment from 'moment-timezone';
import lodash from "lodash";
import DailyRotateFile from 'winston-daily-rotate-file';
import onHeaders from 'on-headers';

const _ = lodash

const { combine, timestamp, label, printf } = format;

const infoFilter = format((info) => {
    return info.level === 'info' ? info : false;
});

const errorFilter = format((info) => {
    return info.level === 'error' ? info : false;
});

const logLabel = process.env.ENVIRONMENT === "DEVELOPMENT" ? 'Dev-API' : 'API';

const SENSITIVE_KEYS = ['password', 'token', 'accessToken', 'authorization'];

export const logger = createLogger({
    format: combine(
        label({ label: logLabel }),
        timestamp(),
        printf(({ level, message, label, timestamp, ...meta }) => {
            const currentTime = moment(timestamp).tz('America/New_York').format();

            let metaString = "";
            if (level === 'info') {
                if (process.env.ENVIRONMENT === "DEVELOPMENT") {
                    metaString = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
                } else {
                    metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';
                }
            } else {
                if (process.env.ENVIRONMENT === "DEVELOPMENT") {
                    metaString = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
                } else {
                    metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';
                }
            }
            return `${currentTime} [${label}] ${_.upperCase(level)}: ${message}\n${metaString}`;
        })
    ),
    transports: [
        new DailyRotateFile({
            filename: 'logs/success-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '60d',
            format: combine(infoFilter(), timestamp()),
            level: 'info',
            handleExceptions: true,
        }),

        new DailyRotateFile({
            filename: 'logs/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '60d',
            format: combine(errorFilter(), timestamp()),
            level: 'error',
            handleExceptions: true,
        }),

        new transports.Console()
    ]
});

export function requestLogger(req, res, next) {
    const start = Date.now();

    onHeaders(res, () => {
        const duration = Date.now() - start;

        logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`, {
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration,
            ip: req.clientIp,
            userAgent: req.headers['user-agent'],
            params: sanitize(req.params),
            query: sanitize(req.query),
            body: sanitize(req.body),
            locals: sanitize(res.locals)
        });
    });

    next();
}

export function errorLogger(err, req, res, next) {
    logger.error(`${req.method} ${req.originalUrl} - ${err.message}`, {
        method: req.method,
        url: req.originalUrl,
        status: err.status || 500,
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        params: sanitize(req.params),
        query: sanitize(req.query),
        body: sanitize(req.body),
        stack: err.stack,
        locals: sanitize(res.locals)
    });

    next(err);
}

export function sanitize(obj = {}) {
    const clone = {};

    for (const key in obj) {
        if (SENSITIVE_KEYS.includes(key.toLowerCase())) {
            clone[key] = '[REDACTED]';
        } else {
            clone[key] = obj[key];
        }
    }

    return clone;
}
