import { Request, Response } from "express";
import UserService from "../service/UserService";

export default new class UserController {
  register(req: Request, res: Response) {
    UserService.register(req, res)
  }

  login(req: Request, res: Response) {
    UserService.login(req, res);
  }

  find(req: Request, res: Response) {
    UserService.find(req, res);
  }
}
