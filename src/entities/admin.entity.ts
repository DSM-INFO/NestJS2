import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
    @PrimaryGeneratedColumn('uuid')
    num: number;

    @Column({ unique: true })
    ID: string;

    @Column()
    password: string;

    @Column({ default: true })
    isAdmin: boolean;

    @CreateDateColumn()
    date: Date;
}