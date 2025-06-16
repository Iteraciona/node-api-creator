// notFoundHandler para rutas no encontradas
import {errorLogger} from '../../../helpers/logger.js';

export const notFoundHandler = (req, res, next) => {
    const err = new Error(`Path Not Found - ${req.originalUrl}`);
    err.status = 404;
    err.path = req.originalUrl;
    next(err);
};

// middleware general de errores
export const errorHandler = (err, req, res, next) => {
    errorLogger(err, req, res, next);

    res.status(err.status || 500).json({
        message: 'Something went wrong',
        error: {
            message: err.message,
            path: err.path || req.originalUrl
        },
        success: false
    });
};
