import { Response, Request } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { VoterEntity } from "../entity/VoterEntity";
import { createVoter } from "../utils/VoterUtils";
import { updateVote } from "../utils/VoterUtils";
import { UserEntity } from "../entity/UserEntity";
import { PaslonEntity } from "../entity/PaslonEntity";

interface MulterFile {
    filename: string;
}

export default new class VoterSrvice {
    private readonly VoterRepository: Repository<VoterEntity> = AppDataSource.getRepository(VoterEntity)
    private readonly UserRepository: Repository<UserEntity> = AppDataSource.getRepository(UserEntity)
    private readonly PaslonRepository: Repository<PaslonEntity> = AppDataSource.getRepository(PaslonEntity)

    async find(req: Request, res: Response): Promise<Response> {
        try {

            const voteCounts = await this.VoterRepository.query(`
                SELECT votepaslonPaslonId, COUNT(*) as count
                FROM voter_entity
                GROUP BY votepaslonPaslonId
            `);

            const Voterfind = await this.VoterRepository.find({ relations: ['voter', 'votepaslon'] });
            return res.status(200).json({Voterfind, voteCounts})
        } catch (error) {
            return res.status(500).json({error:error});
        }
    }

    async findById(req: Request, res: Response): Promise<Response> {
        const id = Number(req.params.id)

        try {
            const Voter = await this.VoterRepository.findOne({ relations: ['voter', 'votepaslon'] });

            if (!Voter) {
                return res.status(404).json({ message: "Voter not found" });
            }

            return res.status(200).json(Voter);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Error while finding Voter by ID" });
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;
            const { error } = createVoter.validate(data);
            if (error) return res.status(400).json({ error: error });

            const selectedUser = await this.UserRepository.findOne({ where: { user_fullname: data.voter_name } });

            if (!selectedUser) {
                return res.status(400).json({ error: "User not found" });
            }

            const existingPaslon = await this.PaslonRepository.findOne({
                where: { paslon_name: data.votepaslon },
            });

            if (!existingPaslon) {
                return res.status(400).json({ error: "Paslon tidak ada" });
            }

            const conditionCheack = await this.VoterRepository.find({ relations: ['voter', 'votepaslon'] });

            const isNamapesertaExist = conditionCheack.some((voter) => voter.voter && voter.voter.user_fullname === data.voter_name);
            const isVotepaslonExist = conditionCheack.some((voter) => voter.votepaslon && voter.votepaslon.paslon_name === data.votepaslon);

            if (isNamapesertaExist) {
                return res.status(400).json({ error: "Namapeserta sudah ada dalam data voter" });
            }

            if (isVotepaslonExist) {
                return res.status(400).json({ error: "Votepaslon sudah ada dalam data voter" });
            }


            const obj = this.VoterRepository.create({
                voter_name: data.voter_name,
                voter_address: data.voter_address,
                voter_gender: data.voter_gender,
                voter: selectedUser,
                votepaslon: existingPaslon,
            });

            const addVoter = await this.VoterRepository.save(obj);

            return res.status(200).json(addVoter);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);

            const existingVoter = await this.VoterRepository.findOneBy({ voter_id: id });

            if (!existingVoter) {
                return res.status(404).json({ error: "Paslon not found" });
            }

            const data = req.body;
            const { error } = updateVote.validate(data);

            if (error) {
                return res.status(400).json({ error: error });
            }

            const selectedUser = await this.UserRepository.findOne({ where: { user_fullname: data.voter_name } });

            if (!selectedUser) {
                return res.status(400).json({ error: "User not found" });
            }

            const existingPaslon = await this.PaslonRepository.findOne({
                where: { paslon_name: data.votepaslon },
            });

            if (!existingPaslon) {
                return res.status(400).json({ error: "Paslon tidak ada" });
            }

            existingVoter.voter_name = data.voter_name;
            existingVoter.voter_address = data.voter_address;
            existingVoter.voter_gender = data.voter_gender;
            existingVoter.voter = selectedUser;
            existingVoter.votepaslon = existingPaslon;

            const updateVoter = await this.VoterRepository.save(existingVoter);

            return res.status(200).json(updateVoter);
        } catch (err) {
            return res.status(500).json({ error: "Error while updating data" });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);

            const existingVoter = await this.VoterRepository.findOneBy({ voter_id: id });

            if (!existingVoter) {
                return res.status(404).json({ error: "Paslon not found" });
            }

            await this.VoterRepository.remove(existingVoter);

            return res.status(200).json({ message: "Voter deleted successfully" });
        } catch (err) {
            return res.status(500).json({ error: "Error while deleting data" });
        }
    }


}