import express from "express";

import userController from "../controller/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add", userController.addUser);

router.post("/login", userController.login);

router.get("/allUsers", userController.getAllUser);

router.get("/authLogin", auth, userController.authLogin);

router.post("/logOut", auth, userController.logOut);

router.post("/logOutAll", auth, userController.logOutAll);

export default router;
