import { Repository } from "typeorm"
import { UserEntity } from "../entity/UserEntity"
import { AppDataSource } from "../data-source"
import * as bcyrpt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { Request, Response } from "express"
import { createLogin, createRegister } from "../utils/UserUtils"


export default new class UserServices {
    private readonly UserRepository: Repository<UserEntity> = AppDataSource.getRepository(UserEntity);

    async register(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body;

            const { error } = createRegister.validate(body);
            if (error) return res.status(400).json({ message: "Error while validating data" });

            const isMailRegisted = await this.UserRepository.count({ where: { user_email: body.user_email } });
            if (isMailRegisted > 0) return res.status(409).json({ message: "Email Registerd, Change!" });

            const hashPassword = await bcyrpt.hash(body.user_password, 10);

            const User = this.UserRepository.create({
                user_fullname: body.user_fullname,
                user_email: body.user_email,
                user_password: hashPassword,
                user_role: body.user_role,
            });

            const userRegister = await this.UserRepository.save(User);

            return res.status(201).json(userRegister);
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }


    async login(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body;

            const { error, value } = createLogin.validate(body);
            if (error) return res.status(400).json({ message: "Error while validating data" });

            const isMailRegisted = await this.UserRepository.findOne({ where: { user_email: value.user_email } });
            if (!isMailRegisted) return res.status(409).json({ message: "Email isnt Registerd, Change!" });

            const isMatchPassword = await bcyrpt.compare(value.user_password, isMailRegisted.user_password);
            if (!isMatchPassword) return res.status(409).json({ message: "Incorrect Password!!!!!" });

            const User = this.UserRepository.create({
                user_email: isMailRegisted.user_email,
                user_password: isMatchPassword.user_password
            });

            const token = jwt.sign({ User }, 'SECRET_KEY', { expiresIn: 9999999 });

            return res.status(201).json(token);

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }


    async find(req: Request, res: Response): Promise<Response> {
        try {
            const user = await this.UserRepository.find();
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ message: "Error while finding data" });
        }
    }

}