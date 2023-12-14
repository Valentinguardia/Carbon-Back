import express from "express";
import multer from "multer";
import userController from "../controllers/userControllers.js";
import auth from "../middlewares/auth.js";

const router = express.Router()
const upload = multer({ dest: "uploads/" });

router.post("/register", userController.register);//OK
router.post("/login", userController.login);//OK
router.post("/forgot-password", userController.mailForgotPassword);//OK
router.post("/reset-password", userController.mailResetPassword);
router.post("/logout", auth, userController.logout);//OK
router.put("/me/change-password", auth, userController.changeUserPassword);
router.put("/me", auth, upload.single("photo"), userController.updateUser);
router.get("/me", auth, userController.me);
router.delete("/me", auth, userController.deleteMe);


export default router;