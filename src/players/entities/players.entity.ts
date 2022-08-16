import { MyTeam } from "src/my-team/entities/Myteam.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Players{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: 'text', nullable: false, unique: false })
    name:string;

    @Column({ type: 'text', nullable: false, unique: false })
    lname:string;

    @Column({ type: 'text', nullable: false, unique: true })
    nik:string;

    @Column({ type: 'text', nullable: false, unique: false })
    kd:number

    @Column({ type: 'text', nullable: false, unique: false })
    impact:number

    @Column({ type: 'float', nullable: false, unique: false })
    rating:number

    @Column({ type: 'text', nullable: false, unique: false })
    team:string

    @Column({ type: 'text', nullable: false, unique: false })
    img:string

    @Column({ type: 'text', nullable: false, unique: false })
    price:number

    @ManyToOne(type=>MyTeam, MyTeam => MyTeam.MyPlayers , )
    MyTeam: MyTeam;
}


