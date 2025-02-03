import ClassService from '@/src/infra/services/ClassService';
import { IClass } from '../entities/Classes';
import CreateExam from './CreateExam';
import { ICreateClassParams } from './CreateClass';

export type ICreateClassAndDefaultExamsParams = ICreateClassParams;

export default class CreateClassAndDefaultExams {
  private readonly classService;

  private readonly creteExam;

  constructor(classService: ClassService, creteExam: CreateExam) {
    this.classService = classService;
    this.creteExam = creteExam;
  }

  async execute(params: ICreateClassAndDefaultExamsParams): Promise<IClass> {
    const classroom = await this.classService.createClass(params);

    const defaultParams = {
      classroomId: classroom.id,
      teacherId: classroom.teacherId,
      answerable: true,
    };

    const currentYear = classroom.year;

    const bimestersInitialDate = [
      new Date(currentYear, 1, 1),
      new Date(currentYear, 3, 1),
      new Date(currentYear, 7, 1),
      new Date(currentYear, 9, 1),
    ];

    const examsPromises = bimestersInitialDate.map((bimester) => {
      return this.creteExam.execute({
        ...defaultParams,
        date: bimester,
      });
    });

    await Promise.all(examsPromises);

    return classroom;
  }
}
