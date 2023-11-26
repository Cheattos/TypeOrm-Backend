import { Response, Request } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { PartaiEntity } from "../entity/PartaiEntity";
import { createPartai } from "../utils/PartaiUtils";
import { updatePartai } from "../utils/PartaiUtils";
import * as fs from "fs";
import cloudinary from "../config";

interface MulterFile {
    filename: string;
}

export default new class partaiService {
    private readonly partaiRepository: Repository<PartaiEntity> = AppDataSource.getRepository(PartaiEntity)

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const partai = await this.partaiRepository.find();
            return res.status(200).json(partai)
        } catch (err) {
            return res.status(500).json({ massage: "error while finding data" });
        }
    }

    async findById(req: Request, res: Response): Promise<Response> {
        const id = Number(req.params.id)

        try {
            const partai = await this.partaiRepository.findOneBy({ partai_id: id });

            if (!partai) {
                return res.status(404).json({ message: "partai not found" });
            }

            return res.status(200).json(partai);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Error while finding Pemilu by ID" });
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;
            const { error } = createPartai.validate(data);
            if (error) return res.status(400).json({ error: error });

            const image = req.file;
            if (!image) return res.status(400).json({ error: "No file provided" });

            const cloudinaryUpload = await cloudinary.uploader.upload(image.path, {
                folder: "partai",
            });

            fs.unlinkSync(image.path);

            const obj = this.partaiRepository.create({
                partai_name: data.partai_name,
                partai_leader: data.partai_leader,
                partai_vision_mision: data.partai_vision_mision,
                partai_logos: cloudinaryUpload.secure_url,
                partai_address: data.partai_address
            });

            const addpartai = await this.partaiRepository.save(obj);

            return res.status(200).json(addpartai);
        } catch (err) {
            return res.status(500).json({ Error: "error while inserting data" });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);

            const existingpartai = await this.partaiRepository.findOneBy({ partai_id: id });

            if (!existingpartai) {
                return res.status(404).json({ error: "partai not found" });
            }

            const data = req.body;
            const { error } = updatePartai.validate(data);

            if (error) {
                return res.status(400).json({ error: error });
            }

            const image = req.file;
            if (!image) {
                return res.status(400).json({ error: "No file provided" });
            }

            const publicIdSegments = existingpartai.partai_logos.split('/');
            const publicIdWithExtension = publicIdSegments[publicIdSegments.length - 1];
            const publicId = publicIdWithExtension.split('.')[0];

            await cloudinary.uploader.destroy(`partai/${publicId}`);

            const cloudinaryUpload = await cloudinary.uploader.upload(image.path, {
                folder: "partai",
            });

            fs.unlinkSync(image.path);

            existingpartai.partai_name = data.partai_name;
            existingpartai.partai_leader = data.partai_leader;
            existingpartai.partai_vision_mision = data.partai_vision_mision;
            existingpartai.partai_logos = cloudinaryUpload.secure_url;
            existingpartai.partai_address = data.partai_address;

            const updatedpartai = await this.partaiRepository.save(existingpartai);

            return res.status(200).json(updatedpartai);
        } catch (err) {
            return res.status(500).json({ error: "Error while updating data" });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);

            const existingpartai = await this.partaiRepository.findOneBy({ partai_id: id });

            if (!existingpartai) {
                return res.status(404).json({ error: "partai not found" });
            }

            const publicIdSegments = existingpartai.partai_logos.split('/');
            const publicIdWithExtension = publicIdSegments[publicIdSegments.length - 1];
            const publicId = publicIdWithExtension.split('.')[0];

            await cloudinary.uploader.destroy(`partai/${publicId}`);

            await this.partaiRepository.remove(existingpartai);

            return res.status(200).json({ message: "partai deleted successfully" });
        } catch (err) {
            return res.status(500).json({ error: "Error while deleting data" });
        }
    }


}
