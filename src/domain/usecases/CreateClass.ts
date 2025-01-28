import ClassService from '@/src/infra/services/ClassService';
import { IClass } from '../entities/Classes';

export type ICreateClassParams = {
  name: string;
  year: number;
  step: string;
  teacherId: number;
};

export default class CreateClass {
  private readonly service;

  constructor(classService: ClassService) {
    this.service = classService;
  }

  execute(params: ICreateClassParams): Promise<IClass> {
    return this.service.createClass(params);
  }
}
