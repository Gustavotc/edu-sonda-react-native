import { IExam } from '../entities/Exam';
import ExamService from '@/src/infra/services/ExamService';

export type ICreateExamParams = {
  date: Date;
  answerable: boolean;
  classroomId: number;
  teacherId: number;
};

export default class CreateExam {
  private readonly service;

  constructor(examService: ExamService) {
    this.service = examService;
  }

  execute(params: ICreateExamParams): Promise<IExam> {
    return this.service.createExam(params);
  }
}
