import { ITeacher } from '../entities/Teacher';
import AuthService from '@/src/infra/services/AuthService';

export default class signInUser {
  private readonly service;

  constructor(authService: AuthService) {
    this.service = authService;
  }

  execute(email: string): Promise<ITeacher> {
    return this.service.login(email);
  }
}
