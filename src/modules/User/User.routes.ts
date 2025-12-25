import { Router } from "express";
import userController from "./User.controller";
import { validateSchema } from "../../middlewares/validateSchema";
import { updateUserSchema } from "./User.schema";
import { AuthMiddleware } from "../../middlewares/authenticateToken";

const userRoutes = Router();

userRoutes.get("/:id", AuthMiddleware.authenticateToken, userController.findById);
userRoutes.put(
  "/:id",
  AuthMiddleware.authenticateToken,
  validateSchema(updateUserSchema),
  userController.update,
);
userRoutes.delete("/:id", AuthMiddleware.authenticateToken, userController.delete);

export default userRoutes;
