import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StatusList {
    @PrimaryGeneratedColumn()
    sid: string;

    @Column()
    name: string;

    @Column()
    content: string;

    @CreateDateColumn()
    date: Date;
}