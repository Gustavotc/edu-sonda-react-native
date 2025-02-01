import { IErrorHandler } from '../errorHandlers/IErrorHandler';
import { IHttpClient, IResponse } from '../httpClient/IHTTPClient';
import MaskUtils from '@/src/utils/masks/MaskUtils';
import { IStudent, IStudentJson } from '@/src/domain/entities/Student';

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
}
