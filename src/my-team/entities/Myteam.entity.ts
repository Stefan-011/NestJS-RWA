import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Players } from 'src/players/entities/players.entity';
import { Sponzor } from 'src/sponzor/entities/sponzor.entity';
import { User } from 'src/user/entities/user.entity';
import { TeamType } from 'src/Enums/TeamType';

@Entity()
export class MyTeam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false, unique: true })
  name: string;

  @ManyToOne((type) => Sponzor, (Sponzor) => Sponzor.MyTeam, {
    onDelete: 'SET NULL',
  })
  MySponzor: Sponzor;

  @OneToMany((type) => Players, (Players) => Players.MyTeam, {
    onDelete: 'SET NULL',
  })
  MyPlayers: Players[];

  @OneToOne((type) => User, (User) => User.MyTeam, { onDelete: 'CASCADE' })
  @JoinColumn()
  Owner: User;

  @ManyToOne((type) => User, (User) => User.MyTeam, { onDelete: 'CASCADE' })
  @JoinColumn()
  Creator: User;

  @Column({ nullable: false })
  TeamType: TeamType;
}
