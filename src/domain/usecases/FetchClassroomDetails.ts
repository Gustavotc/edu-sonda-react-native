import { IClassroomDetails } from '../entities/ClassroomDetails';
import ClassroomDetailsService from '@/src/infra/services/ClassroomDetailsService';

type IFetchClassroomDetailsParams = {
  classroomId: number;
  teacherId: number;
};

export default class FetchClassroomDetails {
  private readonly service;

  constructor(classroomDetailsService: ClassroomDetailsService) {
    this.service = classroomDetailsService;
  }

  execute({
    teacherId,
    classroomId,
  }: IFetchClassroomDetailsParams): Promise<IClassroomDetails> {
    return this.service.fetchDetails(classroomId, teacherId);
  }
}
