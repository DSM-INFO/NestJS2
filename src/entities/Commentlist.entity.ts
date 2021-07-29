import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CommentList {
    @PrimaryGeneratedColumn()
    num: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    date: Date;
}