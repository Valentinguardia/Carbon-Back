import express from "express";
import favoritesControllers from "../controllers/favoritesControllers.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/addFav", auth, favoritesControllers.addFav);
router.post("/deleteFav", auth, favoritesControllers.deleteFav);
router.get("/:userId", auth, favoritesControllers.userId); //OK

export default router;
