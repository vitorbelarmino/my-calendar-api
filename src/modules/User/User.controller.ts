import { Request, Response } from "express";
import userService from "./User.service";

class UserController {
  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const user = await userService.findById(id);

    return res.status(200).json(user);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;

    const user = await userService.update(id, { name });

    return res.status(200).json(user);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const result = await userService.delete(id);

    return res.status(200).json(result);
  }
}

export default new UserController();
