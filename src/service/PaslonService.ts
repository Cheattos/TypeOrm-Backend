import { Response, Request } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { PaslonEntity } from "../entity/PaslonEntity";
import { createUser } from "../utils/PaslonUtils";
import { updateUser } from "../utils/PaslonUtils";
import * as fs from "fs";
import cloudinary from "../config";
import { PartaiEntity } from "../entity/PartaiEntity";
import { error } from "console";

interface MulterFile {
    filename: string;
}

export default new class PaslonService {
    private readonly PaslonRepository: Repository<PaslonEntity> = AppDataSource.getRepository(PaslonEntity)
    private readonly partaiRepository: Repository<PartaiEntity> = AppDataSource.getRepository(PartaiEntity)

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const paslon = await this.PaslonRepository.find({ relations: ['partai'] });
            return res.status(200).json(paslon);
        } catch (err) {
            return res.status(500).json({ message: "Error while finding data" });
        }
    }

    async findById(req: Request, res: Response): Promise<Response> {
        const id = Number(req.params.id);

        try {
            const paslon = await this.PaslonRepository.findOne({ where: { paslon_id: id }, relations: ['partai'] })

            if (!paslon) {
                return res.status(404).json({ message: "Paslon not found" });
            }

            return res.status(200).json(paslon);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Error while finding Pemilu by ID" });
        }
    }


    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;
            const { error } = createUser.validate(data);
            if (error) return res.status(400).json({ error: error });

            const image = req.file;
            if (!image) return res.status(400).json({ error: "No file provided" });

            const selectedPartai = await this.partaiRepository.findOne({ where: { partai_name: data.partai } });

            if (!selectedPartai) {
                return res.status(400).json({ error: "Partai not found" });
            }

            const existingPaslon = await this.PaslonRepository.findOne({
                where: { partai: selectedPartai },
            });

            if (existingPaslon) {
                return res.status(400).json({ error: "Partai sudah mendukung Paslon lain" });
            }

            const cloudinaryUpload = await cloudinary.uploader.upload(image.path, {
                folder: "paslon",
            });

            fs.unlinkSync(image.path);

            const obj = this.PaslonRepository.create({
                paslon_name: data.paslon_name,
                paslon_number: data.paslon_number,
                paslon_vision_mision: data.paslon_vision_mision,
                paslon_photo: cloudinaryUpload.secure_url,
                partai: [selectedPartai],
            });

            const adduser = await this.PaslonRepository.save(obj);

            return res.status(200).json(adduser);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);

            const existingPaslon = await this.PaslonRepository.findOneBy({ paslon_id : id });

            if (!existingPaslon) {
                return res.status(404).json({ error: "Paslon not found" });
            }

            const data = req.body;
            const { error } = updateUser.validate(data);

            if (error) {
                return res.status(400).json({ error: error });
            }

            const image = req.file;
            if (!image) {
                return res.status(400).json({ error: "No file provided" });
            }

            const selectedPartai = await this.partaiRepository.findOneBy({ partai_name: data.partai });

            if (!selectedPartai) {
                return res.status(400).json({ error: "Partai not found" });
            }

            const publicIdSegments = existingPaslon.paslon_photo.split('/');
            const publicIdWithExtension = publicIdSegments[publicIdSegments.length - 1];
            const publicId = publicIdWithExtension.split('.')[0];

            await cloudinary.uploader.destroy(`paslon/${publicId}`);

            const cloudinaryUpload = await cloudinary.uploader.upload(image.path, {
                folder: "paslon",
            });

            fs.unlinkSync(image.path);

            existingPaslon.paslon_name = data.paslon_name;
            existingPaslon.paslon_number = data.paslon_number;
            existingPaslon.paslon_vision_mision = data.paslon_vision_mision;
            existingPaslon.paslon_photo = cloudinaryUpload.secure_url;
            existingPaslon.partai = [selectedPartai];

            const updatedPaslon = await this.PaslonRepository.save(existingPaslon);

            return res.status(200).json(updatedPaslon);
        } catch (error) {
            return res.status(500).json(error);
        }
    }


    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);

            const existingPaslon = await this.PaslonRepository.findOneBy({ paslon_id: id });

            if (!existingPaslon) {
                return res.status(404).json({ error: "Paslon not found" });
            }

            const publicIdSegments = existingPaslon.paslon_photo.split('/');
            const publicIdWithExtension = publicIdSegments[publicIdSegments.length - 1];
            const publicId = publicIdWithExtension.split('.')[0];

            await cloudinary.uploader.destroy(`paslon/${publicId}`);

            await this.PaslonRepository.remove(existingPaslon);

            return res.status(200).json({ message: "Paslon deleted successfully" });
        } catch (err) {
            return res.status(500).json({ error: "Error while deleting data" });
        }
    }


}
