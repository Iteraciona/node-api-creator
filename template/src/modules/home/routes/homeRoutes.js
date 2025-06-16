import express from 'express';
const router = express.Router();

import * as HomeController from '../controllers/homeController.js';

router.get('/', HomeController.index);

export default router;