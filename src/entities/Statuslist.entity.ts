import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StatusList {
    @PrimaryGeneratedColumn()
    sid: string;

    @Column()
    name: string;

    @Column()
    content: string;


    @Column()
    date: Date;
}