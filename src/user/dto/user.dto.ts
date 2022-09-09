import { Role } from 'src/Enums/Role';

export class UserDto {
  username: string;
  password: string;
  email: string;
  role: Role;
}
