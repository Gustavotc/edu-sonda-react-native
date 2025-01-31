import { IErrorHandler } from '../errorHandlers/IErrorHandler';
import { IHttpClient, IResponse } from '../httpClient/IHTTPClient';
import {
  IClassroomDetails,
  IClassroomDetailsJson,
} from '@/src/domain/entities/ClassroomDetails';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export default class ClassroomDetailsService {
  private readonly httpClient;

  private readonly errorHandler;

  constructor(httpClient: IHttpClient, errorHandler: IErrorHandler) {
    this.httpClient = httpClient;
    this.errorHandler = errorHandler;
  }

  async fetchDetails(
    classroomId: number,
    teacherId: number,
  ): Promise<IClassroomDetails> {
    const url = `${BASE_URL}/classe/${classroomId}?teacher_id=${teacherId}`;

    const httpResponse = await this.httpClient.request<
      IResponse<IClassroomDetailsJson>
    >({
      method: 'get',
      url,
    });

    const data = this.errorHandler.handle<IClassroomDetailsJson>(
      httpResponse.data,
    );

    return {
      classroom: {
        id: data.id,
        name: data.name,
        year: data.year,
        step: data.step,
        students: [],
        teacherId: data.teacher.id,
      },
      teacher: {
        id: data.teacher.id,
        email: data.teacher.email,
        name: data.teacher.name,
      },
    };
  }
}
