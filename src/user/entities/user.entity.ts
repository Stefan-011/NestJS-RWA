import { Role } from 'src/Enums/Role';
import { MyTeam } from 'src/my-team/entities/Myteam.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false, unique: true })
  username: string;

  @Column({ type: 'text', nullable: false, unique: false })
  password: string;

  @Column({ type: 'text', nullable: false, unique: true })
  email: string;

  @Column({ type: 'text', nullable: false, unique: false })
  money: number;

  @Column({ type: 'text', nullable: false, unique: false })
  role: Role;

  @OneToOne((type) => MyTeam, (MyTeam) => MyTeam.Owner)
  MyTeam: MyTeam;

  @OneToMany((type) => MyTeam, (MyTeam) => MyTeam.Owner)
  CreatedTeams: MyTeam[];
}
