import { IEnrollment } from '../entities/Enrollment';
import EnrollmentService from '@/src/infra/services/EnrollmentService';

export type IEnrollStudentParams = {
  startDate: string;
  endDate: string;
  studentId: number;
  teacherId: number;
  classroomId: number;
};

export default class EnrollStudent {
  private readonly service;

  constructor(enrollmentService: EnrollmentService) {
    this.service = enrollmentService;
  }

  execute(params: IEnrollStudentParams): Promise<IEnrollment> {
    return this.service.enrollStudent(params);
  }
}
