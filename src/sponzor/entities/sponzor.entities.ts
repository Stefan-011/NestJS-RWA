import { MyTeam } from "src/my-team/entities/Myteam.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sponzor{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: 'text', nullable: false, unique: true })
    name:string;

    @Column({ type: 'text', nullable: false, unique: false })
    img:string

    @Column({ type: 'text', nullable: false, unique: false })
    money:string

    @OneToMany(type=>MyTeam, MyTeam => MyTeam.MySponzor)
    MyTeam: MyTeam[];
}