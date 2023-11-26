import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { UserEntity } from "./UserEntity"

@Entity()
export class BlogEntity {

    @PrimaryGeneratedColumn()
    blog_id: number

    @Column()
    blog_title: string

    @Column({ type: "text" })
    blog_description: string

    @Column()
    blog_cover: string

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })

    posted_at: Date

    @OneToOne(() => UserEntity, (user) => user.manyblogs, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn()
    blogsbyuser: UserEntity
}

// Blog di kelola oleh Admin(User)