import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { UserEntity } from "./UserEntity"
import { PaslonEntity } from "./PaslonEntity"

@Entity()
export class VoterEntity {

    @PrimaryGeneratedColumn()
    voter_id: number

    @Column()
    voter_name: string

    @Column({ type: "text" })
    voter_address: string

    @Column()
    voter_gender: string

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })

    posted_at: Date

    @OneToOne(() => UserEntity, (user) => user.user, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn()
    voter: UserEntity

    @OneToOne(() => PaslonEntity, (paslon) => paslon.voter, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn()
    votepaslon: PaslonEntity
}

// merupakan user, yang data dari voter di tampung pada user