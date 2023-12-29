import express from "express";
import usersRouter from "./users.js";
import favoritesRouter from "./favorites.js";

const router = express.Router();

router.use("/users", usersRouter);
router.use("/favorites", favoritesRouter);


export default router;
