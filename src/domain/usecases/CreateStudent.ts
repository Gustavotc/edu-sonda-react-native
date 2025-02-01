import StudentService from '@/src/infra/services/StudentService';
import { IStudent } from '../entities/Student';

export type ICreateStudentParams = {
  name: string;
  dateOfBirth: string;
};

export default class CreateStudent {
  private readonly service;

  constructor(StudentService: StudentService) {
    this.service = StudentService;
  }

  execute(params: ICreateStudentParams): Promise<IStudent> {
    return this.service.createStudent(params.name, params.dateOfBirth);
  }
}
