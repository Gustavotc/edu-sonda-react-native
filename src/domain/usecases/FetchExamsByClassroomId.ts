import { IExam } from '../entities/Exam';
import { IWithPagination } from './interfaces/WithPagination';
import ExamService from '@/src/infra/services/ExamService';

export default class FetchExamsByClassroomId {
  private readonly service;

  constructor(examsService: ExamService) {
    this.service = examsService;
  }

  execute(classroomId: number): Promise<IWithPagination<IExam>> {
    return this.service.fetchExamsByClassroomId(classroomId);
  }
}
