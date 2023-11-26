import { Request, Response } from "express";
import PaslonService from "../service/PaslonService";

export default new class paslonController {
  find(req: Request, res: Response) {
    PaslonService.find(req, res);
  }

  findById(req: Request, res: Response) {
    PaslonService.findById(req, res);
  }

  create(req: Request, res: Response) {
    PaslonService.create(req, res);
  }

  update(req: Request, res: Response) {
    PaslonService.update(req, res);
  }

  delete(req: Request, res: Response) {
    PaslonService.delete(req, res);
  }

}
