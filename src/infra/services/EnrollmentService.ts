import { IEnrollStudentParams } from '@/src/domain/usecases/EnrollStudent';
import { IErrorHandler } from '../errorHandlers/IErrorHandler';
import {
  IHttpClient,
  IPaginatedResponse,
  IResponse,
} from '../httpClient/IHTTPClient';
import { IEnrollment, IEnrollmentJson } from '@/src/domain/entities/Enrollment';
import MaskUtils from '@/src/utils/masks/MaskUtils';
import { IStudent, IStudentJson } from '@/src/domain/entities/Student';
import { IWithPagination } from '@/src/domain/usecases/interfaces/WithPagination';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export default class EnrollmentService {
  private readonly httpClient;

  private readonly errorHandler;

  constructor(httpClient: IHttpClient, errorHandler: IErrorHandler) {
    this.httpClient = httpClient;
    this.errorHandler = errorHandler;
  }

  async enrollStudent(params: IEnrollStudentParams): Promise<IEnrollment> {
    const body = {
      start_date: MaskUtils.applyIsoDateMaskToIsoDateString(params.startDate),
      end_date: MaskUtils.applyIsoDateMaskToIsoDateString(params.endDate),
      student_id: params.studentId,
      teacher_id: params.teacherId,
      classroom_id: params.classroomId,
    };

    const httpResponse = await this.httpClient.request<
      IResponse<IEnrollmentJson>
    >({
      method: 'post',
      url: `${BASE_URL}/enrollment`,
      body,
    });

    const data = this.errorHandler.handle<IEnrollmentJson>(httpResponse.data);

    return {
      id: data.id,
      startDate: data.startDate,
      endDate: data.endDate,
      student: {
        id: data.student.id,
        name: data.student.name,
        dateOfBirth: data.student.date_of_birth,
      },
    };
  }

  async fetchStudentsByClassroomId(
    classroomId: number,
    teacherId: number,
  ): Promise<IWithPagination<IStudent>> {
    const url = `${BASE_URL}/enrollment/${classroomId}/students?teacher_id=${teacherId}&limit=100&page=1`;

    const httpResponse = await this.httpClient.request<
      IPaginatedResponse<IStudentJson>
    >({
      method: 'get',
      url,
    });

    const data = this.errorHandler.handle<IStudentJson[]>(httpResponse.data);

    const students = data.map<IStudent>((studentJson) => {
      return {
        id: studentJson.id,
        name: studentJson.name,
        dateOfBirth: studentJson.date_of_birth,
      };
    });

    return {
      data: students,
      totalPages: httpResponse.data.total_page,
    };
  }
}
