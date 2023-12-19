import express from 'express';
import userStylesControllers from "../controllers/userStylesControllers.js"
import auth from '../middlewares/auth.js';


const router = express.Router();

router.post("/createStyle", userStylesControllers.createStyle);//OK
router.get("/:styleId", userStylesControllers.styleId);//OK
router.get("/user/:userId", auth,userStylesControllers.userId);//OK
router.put("/:styleId", userStylesControllers.updateStyle);//OK
router.delete("/:styleId", userStylesControllers.deleteStyle);//OK



export default router;
