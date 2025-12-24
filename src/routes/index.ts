import { Router } from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";

const routes = Router();
routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);

export { routes };
