import TeacherService from '@/src/infra/services/TeacherService';
import { ITeacher } from '../entities/Teacher';

type IRegisterTeacherParams = Omit<ITeacher, 'id'>;

export default class RegisterTeacher {
  private readonly service;

  constructor(teacherService: TeacherService) {
    this.service = teacherService;
  }

  execute(teacher: IRegisterTeacherParams): Promise<ITeacher> {
    return this.service.register(teacher.name, teacher.email);
  }
}
