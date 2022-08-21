import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Players } from "src/players/entities/players.entity";
import { Sponzor } from "src/sponzor/entities/sponzor.entity"
import { User } from "src/user/entities/user.entity";

@Entity()
export class MyTeam{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: 'text', nullable: false, unique: true })
    name:string;

    @ManyToOne(type=>Sponzor, Sponzor => Sponzor.MyTeam ,{onDelete:'CASCADE'}) 
    MySponzor: Sponzor

    @OneToMany(type=>Players, Players => Players.MyTeam ,{onDelete:'CASCADE'})
    MyPlayers: Players[];

    @OneToOne(type=>User , User => User.MyTeam ,{onDelete:'CASCADE'}) 
    @JoinColumn()
    Owner:User;
    
}