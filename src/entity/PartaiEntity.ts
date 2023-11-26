import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { PaslonEntity } from "./PaslonEntity"

@Entity()
export class PartaiEntity {

    @PrimaryGeneratedColumn()
    partai_id: number

    @Column()
    partai_name: string

    @Column()
    partai_leader: string

    @Column({ type: "text" })
    partai_vision_mision: string

    @Column()
    partai_logos: string

    @Column()
    partai_address: string

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })

    posted_at: Date

    @OneToOne(() => PaslonEntity, (paslon) => paslon.partai, {
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
    })
    @JoinColumn()
    paslon: PaslonEntity[]
}

// 1 Partai hanya bisa memilih 1 paslon
