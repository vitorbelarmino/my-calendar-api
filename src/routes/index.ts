import { Router } from "express";
import userRoutes from "../modules/User/User.routes";
import authRoutes from "../modules/Auth/Auth.routes";

const routes = Router();
routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);

export { routes };
