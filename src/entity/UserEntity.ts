import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm"
import { BlogEntity } from "./BlogEntity"
import { VoterEntity } from "./VoterEntity"

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    user_id: number

    @Column()
    user_fullname: string

    @Column()
    user_email: string

    @Column()
    user_password: string

    @Column()
    user_role: string

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })

    posted_at: Date

    @OneToMany(() => BlogEntity, (blog) => blog.blogsbyuser, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn()
    manyblogs: BlogEntity[]

    @OneToOne(() => VoterEntity, (vote) => vote.voter, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn()
    user: VoterEntity
}

// user yang berisi data voter, menerima input dari voter