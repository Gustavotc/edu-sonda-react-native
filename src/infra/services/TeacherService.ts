import { ITeacher, ITeacherJson } from '@/src/domain/entities/Teacher';
import { IErrorHandler } from '../errorHandlers/IErrorHandler';
import { IHttpClient, IResponse } from '../httpClient/IHTTPClient';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export default class TeacherService {
  private readonly httpClient;

  private readonly errorHandler;

  constructor(httpClient: IHttpClient, errorHandler: IErrorHandler) {
    this.httpClient = httpClient;
    this.errorHandler = errorHandler;
  }

  async register(name: string, email: string): Promise<ITeacher> {
    const httpResponse = await this.httpClient.request<IResponse<ITeacherJson>>(
      {
        method: 'post',
        url: `${BASE_URL}/teacher`,
        body: { name, email },
      },
    );

    const data = this.errorHandler.handle<ITeacherJson>(httpResponse.data);

    return {
      id: data.id,
      email: data.email,
      name: data.name,
    };
  }
}
