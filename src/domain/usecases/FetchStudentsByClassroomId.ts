import EnrollmentService from '@/src/infra/services/EnrollmentService';
import { IWithPagination } from './interfaces/WithPagination';
import { IStudent } from '../entities/Student';

export type IFetchStudentsByClassroomId = {
  classroomId: number;
  teacherId: number;
};

export default class FetchStudentsByClassroomId {
  private readonly service;

  constructor(enrollmentService: EnrollmentService) {
    this.service = enrollmentService;
  }

  execute(
    params: IFetchStudentsByClassroomId,
  ): Promise<IWithPagination<IStudent>> {
    return this.service.fetchStudentsByClassroomId(
      params.classroomId,
      params.teacherId,
    );
  }
}
