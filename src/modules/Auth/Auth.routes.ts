import { Router } from "express";
import authController from "./Auth.controller";
import { validateSchema } from "../../middlewares/validateSchema";
import { loginSchema, registerSchema, refreshTokenSchema } from "./Auth.schema";

const authRoutes = Router();

authRoutes.post("/login", validateSchema(loginSchema), authController.login);
authRoutes.post("/register", validateSchema(registerSchema), authController.register);
authRoutes.post("/refresh", validateSchema(refreshTokenSchema), authController.refresh);

export default authRoutes;
