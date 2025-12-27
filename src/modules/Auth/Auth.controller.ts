import { Request, Response } from "express";
import authService from "./Auth.service";
import { getUserId } from "../../Utils/GetUserId";
import userService from "../User/User.service";

class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const result = await authService.login({ email, password });

    return res.status(200).json(result);
  }

  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const result = await authService.register({ name, email, password });

    return res.status(201).json(result);
  }

  async refresh(req: Request, res: Response) {
    const { refreshToken } = req.body;

    const result = await authService.refreshToken(refreshToken);

    return res.status(200).json(result);
  }

  async getMe(req: Request, res: Response) {
    const userId = getUserId(req);

    const user = await userService.findById(userId);

    return res.status(200).json(user);
  }
}

export default new AuthController();
