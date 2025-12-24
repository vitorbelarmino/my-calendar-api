import { Request, Response } from "express";
import userService from "./User.service";

class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const user = await userService.create({ name, email, password });

    return res.status(201).json(user);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const user = await userService.findById(id);

    return res.status(200).json(user);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await userService.update(id, { name, email, password });

    return res.status(200).json(user);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const result = await userService.delete(id);

    return res.status(200).json(result);
  }
}

export default new UserController();
