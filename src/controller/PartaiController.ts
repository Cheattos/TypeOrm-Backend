import { Request, Response } from "express";
import PartaiService from "../service/PartaiService";

export default new class PartaiController {
  find(req: Request, res: Response) {
    PartaiService.find(req, res)
  }

  findById(req: Request, res: Response) {
    PartaiService.findById(req, res);
  }

  create(req: Request, res: Response) {
    PartaiService.create(req, res);
  }

  update(req: Request, res: Response) {
    PartaiService.update(req, res);
  }

  delete(req: Request, res: Response) {
    PartaiService.delete(req, res);
  }
}
