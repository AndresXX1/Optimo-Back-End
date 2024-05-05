import { Request } from 'express';
import { Role } from '../enums/rol.enum';

export interface IUserRequest {
  email: string;
  role: Role;
  name: string;
}

export interface IRequestWhitUser extends Request {
  user: IUserRequest;
}
