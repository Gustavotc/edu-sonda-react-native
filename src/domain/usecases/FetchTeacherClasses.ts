import ClassService from '@/src/infra/services/ClassService';
import { IClass } from '../entities/Classes';
import { IWithPagination } from './interfaces/WithPagination';

type IFetchTeacherClassesParams = {
  teacherId: number;
  page: number;
  limit?: number;
};

export default class FetchTeacherClasses {
  private readonly service;

  constructor(classService: ClassService) {
    this.service = classService;
  }

  execute({
    teacherId,
    page,
    limit = 10,
  }: IFetchTeacherClassesParams): Promise<IWithPagination<IClass>> {
    return this.service.fetchTeacherClasses(teacherId, page, limit);
  }
}
