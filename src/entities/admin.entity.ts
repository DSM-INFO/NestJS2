import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    ID: string;

    @Column()
    password: string;

    @Column()
    date: Date;
}