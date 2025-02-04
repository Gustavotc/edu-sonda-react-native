import ExamService from '@/src/infra/services/ExamService';
import { IExam } from '../entities/Exam';

export default class FetchExamById {
  private readonly service;

  constructor(examService: ExamService) {
    this.service = examService;
  }

  execute(examId: number): Promise<IExam> {
    return this.service.fetchById(examId);
  }
}
