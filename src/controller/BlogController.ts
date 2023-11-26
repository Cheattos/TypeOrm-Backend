import { Request, Response } from "express";
import BlogService from "../service/BlogService";

export default new class BlogController {
  find(req: Request, res: Response) {
    BlogService.find(req, res)
  }

  findById(req: Request, res: Response) {
    BlogService.findById(req, res);
  }

  create(req: Request, res: Response) {
    BlogService.create(req, res);
  }

  update(req: Request, res: Response) {
    BlogService.update(req, res);
  }

  delete(req: Request, res: Response) {
    BlogService.delete(req, res);
  }
}
