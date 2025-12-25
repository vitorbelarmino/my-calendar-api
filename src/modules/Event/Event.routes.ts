import { Router } from "express";
import eventController from "./Event.controller";
import { validateSchema } from "../../middlewares/validateSchema";
import { createEventSchema, updateEventSchema } from "./Event.schema";
import { AuthMiddleware } from "../../middlewares/authenticateToken";

const eventRoutes = Router();

eventRoutes.post(
  "/",
  AuthMiddleware.authenticateToken,
  validateSchema(createEventSchema),
  eventController.create,
);
eventRoutes.get("/", AuthMiddleware.authenticateToken, eventController.findAllByUser);
eventRoutes.get("/:id", AuthMiddleware.authenticateToken, eventController.findById);
eventRoutes.put(
  "/:id",
  AuthMiddleware.authenticateToken,
  validateSchema(updateEventSchema),
  eventController.update,
);
eventRoutes.delete("/:id", AuthMiddleware.authenticateToken, eventController.delete);

export default eventRoutes;
