import { MyTeam } from "src/my-team/entities/Myteam.entity";
import { Players } from "src/players/entities/players.entity";
import { Sponzor } from "src/sponzor/entities/sponzor.entity";
import { User } from "src/user/entities/user.entity";
import { DataSourceOptions } from "typeorm";



export const typeOrmConfig: DataSourceOptions = {
    type:"postgres",
    host:'localhost',
    port: 5432,
    username: "postgres",
    password: "mysecretpassword",
    entities: [Players,Sponzor,User,MyTeam],
    synchronize:true,
    database:"rwa"
}