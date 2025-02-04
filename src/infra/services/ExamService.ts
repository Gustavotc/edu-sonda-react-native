import { IExam, IExamJson } from '@/src/domain/entities/Exam';
import { IErrorHandler } from '../errorHandlers/IErrorHandler';
import {
  IHttpClient,
  IPaginatedResponse,
  IResponse,
} from '../httpClient/IHTTPClient';
import { ICreateExamParams } from '@/src/domain/usecases/CreateExam';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export default class ExamService {
  private readonly httpClient;

  private readonly errorHandler;

  constructor(httpClient: IHttpClient, errorHandler: IErrorHandler) {
    this.httpClient = httpClient;
    this.errorHandler = errorHandler;
  }

  async fetchExamsByClassroomId(
    classroomId: number,
    page = 1,
    limit = 10,
  ): Promise<{ data: IExam[]; totalPages: number }> {
    const url = `${BASE_URL}/exams?classroom_id=${classroomId}&page=${page}&limit=${limit}`;

    const httpResponse = await this.httpClient.request<
      IPaginatedResponse<IExamJson>
    >({
      method: 'get',
      url,
    });

    const data = this.errorHandler.handle<IExamJson[]>(httpResponse.data);

    const exams: IExam[] = data
      .map((item) => {
        return {
          id: item.id,
          answerable: item.answerable,
          date: new Date(item.date),
        };
      })
      .sort((item, nextItem) => item.date.getTime() - nextItem.date.getTime());

    return {
      data: exams,
      totalPages: httpResponse.data.total_page,
    };
  }

  async createExam(params: ICreateExamParams): Promise<IExam> {
    const url = `${BASE_URL}/exams`;

    const body = {
      date: params.date.toISOString(),
      answerable: params.answerable,
      classroom_id: params.classroomId,
      teacher_id: params.teacherId,
    };

    const httpResponse = await this.httpClient.request<IResponse<IExamJson>>({
      method: 'post',
      url,
      body,
    });

    const data = this.errorHandler.handle<IExamJson>(httpResponse.data);

    return {
      id: data.id,
      answerable: data.answerable,
      date: new Date(data.date),
    };
  }

  async fetchById(examId: number): Promise<IExam> {
    const url = `${BASE_URL}/exams/${examId}`;

    const httpResponse = await this.httpClient.request<IResponse<IExamJson>>({
      method: 'get',
      url,
    });

    const data = this.errorHandler.handle<IExamJson>(httpResponse.data);

    return {
      id: data.id,
      answerable: data.answerable,
      date: new Date(data.date),
    };
  }
}
