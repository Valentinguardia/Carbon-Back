import express from 'express';
import favoritesControllers from "../controllers/favoritesControllers.js"
import auth from '../middlewares/auth.js';


const router = express.Router();


export default router;