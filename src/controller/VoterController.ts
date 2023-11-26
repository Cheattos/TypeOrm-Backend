import { Request, Response } from "express";
import VoterService from "../service/VoterService";

export default new class VoterController {
  find(req: Request, res: Response) {
    VoterService.find(req, res)
  }

  findById(req: Request, res: Response) {
    VoterService.findById(req, res);
  }

  create(req: Request, res: Response) {
    VoterService.create(req, res);
  }

  update(req: Request, res: Response) {
    VoterService.update(req, res);
  }

  delete(req: Request, res: Response) {
    VoterService.delete(req, res);
  }
}
