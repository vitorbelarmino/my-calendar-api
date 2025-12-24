import { Router } from "express";
import userController from "../modules/User/User.controller";
import { validateSchema } from "../middlewares/validateSchema";
import { createUserSchema, updateUserSchema } from "../schemas/userSchema";

const userRoutes = Router();

userRoutes.post("/", validateSchema(createUserSchema), userController.create);
userRoutes.get("/:id", userController.findById);
userRoutes.put("/:id", validateSchema(updateUserSchema), userController.update);
userRoutes.delete("/:id", userController.delete);

export default userRoutes;
