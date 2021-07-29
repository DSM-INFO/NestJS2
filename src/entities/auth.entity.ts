import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Auth {
    @PrimaryGeneratedColumn()
    uid: string;

    @Column()
    id: string;

    @Column()
    name: string;

    @Column()
    grade: number;

    @Column()
    status: number;

    @Column()
    password: string;

    @Column()
    date: Date;
}