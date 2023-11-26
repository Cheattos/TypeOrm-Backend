import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm"
import { VoterEntity } from "./VoterEntity"
import { PartaiEntity } from "./PartaiEntity"

@Entity()
export class PaslonEntity {

    @PrimaryGeneratedColumn()
    paslon_id: number

    @Column()
    paslon_name: string

    @Column()
    paslon_number: string

    @Column({ type: "text" })
    paslon_vision_mision: string

    @Column()
    paslon_photo: string

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })

    posted_at: Date

    @OneToMany(() => PartaiEntity, (partai) => partai.paslon, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn()
    partai: PartaiEntity[]

    @OneToMany(() => VoterEntity, (voter) => voter.votepaslon, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn()
    voter: VoterEntity[]
}


// 1 Paslon dapat menerima banyak partai