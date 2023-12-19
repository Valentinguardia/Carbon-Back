import express from 'express';
import codeHistoryControllers from "../controllers/codeHistoryControllers.js"
import auth from '../middlewares/auth.js';


const router = express.Router();

router.get("/:snippetId", codeHistoryControllers.snippetId)//OK
router.get("/user/:userId", auth,codeHistoryControllers.userId);//OK


export default router;