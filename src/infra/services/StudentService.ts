import { IErrorHandler } from '../errorHandlers/IErrorHandler';
import { IHttpClient, IResponse } from '../httpClient/IHTTPClient';
import MaskUtils from '@/src/utils/masks/MaskUtils';
import { IStudent, IStudentJson } from '@/src/domain/entities/Student';
import {
  IStudentWithExamFlag,
  IStudentWithExamFlagJson,
} from '@/src/domain/entities/StudentWithExamFlag';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export default class StudentService {
  private readonly httpClient;

  private readonly errorHandler;

  constructor(httpClient: IHttpClient, errorHandler: IErrorHandler) {
    this.httpClient = httpClient;
    this.errorHandler = errorHandler;
  }

  async createStudent(name: string, dateOfBirth: string): Promise<IStudent> {
    const formattedDate = MaskUtils.applyIsoDateMask(dateOfBirth);

    const body = {
      name,
      date_of_birth: formattedDate,
    };

    const httpResponse = await this.httpClient.request<IResponse<IStudentJson>>(
      {
        method: 'post',
        url: `${BASE_URL}/student`,
        body,
      },
    );

    const data = this.errorHandler.handle<IStudentJson>(httpResponse.data);

    return {
      id: data.id,
      name: data.name,
      dateOfBirth: data.date_of_birth,
    };
  }

  async fetchStudentsByExamId(examId: number): Promise<IStudentWithExamFlag[]> {
    const url = `${BASE_URL}/student/answered-exam?exam_id=${examId}`;

    const httpResponse = await this.httpClient.request<
      IResponse<IStudentWithExamFlagJson[]>
    >({
      method: 'get',
      url,
    });

    const data = this.errorHandler.handle<IStudentWithExamFlagJson[]>(
      httpResponse.data,
    );

    return data.map((studentJson) => {
      return {
        id: studentJson.id,
        name: studentJson.name,
        dateOfBirth: studentJson.date_of_birth,
        hasCompletedExam: studentJson.has_completed_exam,
      };
    });
  }
}
