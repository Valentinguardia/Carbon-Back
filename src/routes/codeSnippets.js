import express from 'express';
import codeSnippetsControllers from "../controllers/codeSnippetsControllers.js"
import auth from '../middlewares/auth.js';


const router = express.Router();


export default router;