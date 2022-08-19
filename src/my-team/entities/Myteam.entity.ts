import { Players } from "src/players/entities/players.entity";
import { Sponzor } from "src/sponzor/entities/sponzor.entities";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MyTeam{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: 'text', nullable: false, unique: true })
    name:string;

    @ManyToOne(type=>Sponzor, Sponzor => Sponzor.MyTeam )
    MySponzor: Sponzor

    @OneToMany(type=>Players, Players => Players.MyTeam )
    MyPlayers: Players[];

    @OneToOne(type=>User , User => User.MyTeam)
    @JoinColumn()
    Owner:User;
    
 // Veze
}