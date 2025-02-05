import StudentService from '@/src/infra/services/StudentService';
import { IStudentWithExamFlag } from '../entities/StudentWithExamFlag';

export default class FetchStudentsWithExamFlag {
  private readonly service;

  constructor(studentService: StudentService) {
    this.service = studentService;
  }

  execute(examId: number): Promise<IStudentWithExamFlag[]> {
    return this.service.fetchStudentsByExamId(examId);
  }
}
