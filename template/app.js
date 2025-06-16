import morgan from 'morgan';
import express from 'express';
import expressLayouts from 'express-ejs-layouts'
import cors from 'cors';
import requestIp from "request-ip";
import * as path from "path";
import {customMiddleware} from "./src/middlewares/custom.js";
import {fileURLToPath} from "url";
import {userInfo} from "./src/middlewares/userInfo.js";
import {setupMongooseLogger} from './src/helpers/mongoose-logger.js';
import {errorLogger, requestLogger} from './src/helpers/logger.js';
import rateLimit from 'express-rate-limit';
import homeRoutes from './src/modules/home/routes/homeRoutes.js';
import v1 from './src/routes/v1/index.js';
import {errorHandler, notFoundHandler} from './src/modules/home/controllers/notFoundController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const rootDir = path.resolve(__dirname);

// App
const app = express();

// ejs as view engine
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout-extractScripts', true);
app.set('layoutDir', process.cwd() + '/src/views');
app.set('views', process.cwd() + '/src/views');

// morgan to log
app.use(morgan('dev'));

//update the limit for json string
app.use(express.json({ limit: '10mb' }));

//urlencode
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// IP's client
app.use(requestIp.mw());

//CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permitir todos los orígenes
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

// user info
app.use(userInfo)

// Other middlewares and routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', 1);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 connections
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// Custom middleware
app.use(customMiddleware);

setupMongooseLogger();
app.use(requestLogger);

const botLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 3,
    message: 'Too much requests',
});

app.get(['/favicon.ico', '/favicon.png'], botLimiter, (req, res) => {
    res.status(204).end();
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', homeRoutes);

app.use('/v1', v1);

app.use(errorLogger);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;