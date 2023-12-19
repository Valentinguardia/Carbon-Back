import express from 'express';
import codeSnippetsControllers from "../controllers/codeSnippetsControllers.js"
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post("/snippets", codeSnippetsControllers.snippets)//OK
router.get("/:snippetId", codeSnippetsControllers.snippetId);//OK
router.get("/user/:userId", auth, codeSnippetsControllers.userId);//OK
router.put("/:snippetId", codeSnippetsControllers.updateSnippet);//OK
router.delete("/:snippetId", codeSnippetsControllers.deleteSnippet);//OK

export default router;