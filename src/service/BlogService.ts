import { Response, Request } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { BlogEntity } from "../entity/BlogEntity";
import { createBlog } from "../utils/BlogUtils";
import { upBlog } from "../utils/BlogUtils";
import * as fs from "fs";
import cloudinary from "../config";
import { UserEntity } from "../entity/UserEntity";

interface MulterFile {
    filename: string;
}

export default new class BlogService {
    private readonly BlogRepository: Repository<BlogEntity> = AppDataSource.getRepository(BlogEntity)
    private readonly UserRepository: Repository<UserEntity> = AppDataSource.getRepository(UserEntity)

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const Artikelfind = await this.BlogRepository.find({ relations: ['blogsbyuser'] });
            return res.status(200).json(Artikelfind)
        } catch (err) {
            return res.status(500).json({ massage: "error while find data" });
        }
    }

    async findById(req: Request, res: Response): Promise<Response> {
        const id = Number(req.params.id)

        try {
            const Blog = await this.BlogRepository.findOne({ where: { blog_id: id }, relations: ['blogsbyuser'] });

            if (!Blog) {
                return res.status(404).json({ message: "Blog not found" });
            }

            return res.status(200).json(Blog);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Error while finding Blog by ID" });
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;
            const { error } = createBlog.validate(data);
            if (error) return res.status(400).json({ error: error });

            const image = req.file;
            if (!image) return res.status(400).json({ error: "No file provided" });

            const selectedUser = await this.UserRepository.findOne({ where: { user_fullname: data.blogsbyuser } });

            if (!selectedUser) {
                return res.status(400).json({ error: "User not found" });
            }

            const cloudinaryUpload = await cloudinary.uploader.upload(image.path, {
                folder: "blog",
            });

            fs.unlinkSync(image.path);

            const obj = this.BlogRepository.create({
                blog_title: data.blog_title,
                blog_description: data.blog_description,
                blog_cover: cloudinaryUpload.secure_url,
                blogsbyuser: selectedUser,
            });

            const addArtikel = await this.BlogRepository.save(obj);

            return res.status(200).json(addArtikel);
        } catch (err) {
            return res.status(500).json({ Error: "error while inserting data" });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);

            const existingArtikel = await this.BlogRepository.findOneBy({ blog_id: id });

            if (!existingArtikel) {
                return res.status(404).json({ error: "Paslon not found" });
            }

            const data = req.body;
            const { error } = upBlog.validate(data);

            if (error) {
                return res.status(400).json({ error: error });
            }

            const image = req.file;
            if (!image) {
                return res.status(400).json({ error: "No file provided" });
            }

            const selectedUser = await this.UserRepository.findOne({ where: { user_fullname: data.blogsbyuser } });

            if (!selectedUser) {
                return res.status(400).json({ error: "Author not found" });
            }

            const publicIdSegments = existingArtikel.blog_cover.split('/');
            const publicIdWithExtension = publicIdSegments[publicIdSegments.length - 1];
            const publicId = publicIdWithExtension.split('.')[0];

            await cloudinary.uploader.destroy(`blog/${publicId}`);

            const cloudinaryUpload = await cloudinary.uploader.upload(image.path, {
                folder: "blog",
            });

            fs.unlinkSync(image.path);

            existingArtikel.blog_title = data.blog_title;
            existingArtikel.blog_description = data.blog_description;
            existingArtikel.blog_cover = cloudinaryUpload.secure_url;
            existingArtikel.blogsbyuser = selectedUser;

            const updateArtikel = await this.BlogRepository.save(existingArtikel);

            return res.status(200).json(updateArtikel);
        } catch (err) {
            return res.status(500).json({ error: "Error while updating data" });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);

            const existingArtikel = await this.BlogRepository.findOneBy({ blog_id: id });

            if (!existingArtikel) {
                return res.status(404).json({ error: "Paslon not found" });
            }

            const publicIdSegments = existingArtikel.blog_cover.split('/');
            const publicIdWithExtension = publicIdSegments[publicIdSegments.length - 1];
            const publicId = publicIdWithExtension.split('.')[0];

            await cloudinary.uploader.destroy(`blog/${publicId}`);

            await this.BlogRepository.remove(existingArtikel);

            return res.status(200).json({ message: "Artikel deleted successfully" });
        } catch (err) {
            return res.status(500).json({ error: "Error while deleting data" });
        }
    }


}