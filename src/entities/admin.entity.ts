import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    num: number;

    @Column({ unique: true })
    ID: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({ default: true })
    isAdmin: boolean;

    @CreateDateColumn()
    date: Date;
}