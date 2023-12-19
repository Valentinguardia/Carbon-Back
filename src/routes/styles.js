import express from 'express';
import stylesControllers from "../controllers/stylesControllers.js"
import auth from '../middlewares/auth.js';


const router = express.Router();

router.post("/createStyle", stylesControllers.createStyle)//OK
router.put("/:styleId", stylesControllers.updateStyle)//OK
router.get("/:styleId", stylesControllers.styleId)//OK
router.get("/", stylesControllers.styles)//OK
router.delete("/:styleId", stylesControllers.deleteStyle)//OK


export default router;
