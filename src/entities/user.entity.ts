import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    uid: string;

    @Column()
    id: string;

    @Column()
    name: string;

    @Column()
    grade: number;

    @Column({ nullable: true })
    status: number;

    @Column()
    password: string;

    @CreateDateColumn()
    date: Date;
}