import express from "express";
import usersRouter from "./users.js";
import codeHistoryRouter from "./codeHistory.js";
import codeSnippetsRouter from "./codeSnippets.js";
import favoritesRouter from "./favorites.js";
import stylesRouter from "./styles.js";
import userStylesRouter from "./userStyles.js";

const router = express.Router();

router.use("/users", usersRouter);
router.use("/codeHistory", codeHistoryRouter);
router.use("/codeSnippets", codeSnippetsRouter);
router.use("/favorites", favoritesRouter);
router.use("/styles", stylesRouter);
router.use("/userStyles", userStylesRouter);

export default router;
