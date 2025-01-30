import { ICreateClassParams } from '@/src/domain/usecases/CreateClass';
import { IErrorHandler } from '../errorHandlers/IErrorHandler';
import {
  IHttpClient,
  IPaginatedResponse,
  IResponse,
} from '../httpClient/IHTTPClient';
import { IClass, IClassJson } from '@/src/domain/entities/Classes';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

type ICreateClassBody = {
  name: string;
  year: number;
  step: string;
  teacher_id: number;
};

export default class ClassService {
  private readonly httpClient;

  private readonly errorHandler;

  constructor(httpClient: IHttpClient, errorHandler: IErrorHandler) {
    this.httpClient = httpClient;
    this.errorHandler = errorHandler;
  }

  async fetchTeacherClasses(
    teacherId: number,
    page: number,
    limit = 10,
  ): Promise<{ data: IClass[]; totalPages: number }> {
    const url = `${BASE_URL}/classe?teacher_id=${teacherId}&page=${page}&limit=${limit}`;

    const httpResponse = await this.httpClient.request<
      IPaginatedResponse<IClassJson>
    >({
      method: 'get',
      url,
    });

    const data = this.errorHandler.handle<IClassJson[]>(httpResponse.data);

    const classes = data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        year: item.year,
        step: item.step,
        teacherId: item.teacher_id,
        students: [],
      };
    });

    return {
      data: classes,
      totalPages: httpResponse.data.total_page,
    };
  }

  async createClass(params: ICreateClassParams): Promise<IClass> {
    const url = `${BASE_URL}/classe`;

    const body: ICreateClassBody = {
      name: params.name,
      step: params.step,
      year: params.year,
      teacher_id: params.teacherId,
    };

    const httpResponse = await this.httpClient.request<IResponse<IClassJson>>({
      method: 'post',
      url,
      body,
    });

    const data = this.errorHandler.handle<IClassJson>(httpResponse.data);

    return {
      id: data.id,
      name: data.name,
      year: data.year,
      step: data.step,
      teacherId: data.teacher_id,
      students: [],
    };
  }
}
