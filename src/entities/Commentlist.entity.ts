import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CommentList {
    @PrimaryGeneratedColumn()
    num: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @CreateDateColumn()
    date: Date;
}