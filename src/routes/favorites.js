import express from "express";
import favoritesControllers from "../controllers/favoritesControllers.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/addFav",  favoritesControllers.addFav);
router.post("/deleteFav", auth, favoritesControllers.deleteFav);
router.get("/verifyFavorite", favoritesControllers.verifyFavorite); 
router.get("/:userId", favoritesControllers.userId); //OK


export default router;
