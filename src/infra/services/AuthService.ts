import { ITeacher, ITeacherJson } from '@/src/domain/entities/Teacher';
import { IErrorHandler } from '../errorHandlers/IErrorHandler';
import { IHttpClient, IResponse } from '../httpClient/IHTTPClient';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export default class AuthService {
  private readonly httpClient;

  private readonly errorHandler;

  constructor(httpClient: IHttpClient, errorHandler: IErrorHandler) {
    this.httpClient = httpClient;
    this.errorHandler = errorHandler;
  }

  async login(email: string): Promise<ITeacher> {
    const httpResponse = await this.httpClient.request<IResponse<ITeacherJson>>(
      {
        method: 'post',
        url: `${BASE_URL}/auth/login`,
        body: { email },
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
