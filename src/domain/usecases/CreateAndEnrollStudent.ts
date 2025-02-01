import { IEnrollment } from '../entities/Enrollment';
import makeCreateStudent from '@/src/factories/usecases/CreateStudentFactory';
import makeEnrollStudent from '@/src/factories/usecases/EnrollStudentFactory';

export type ICreateAndEnrollStudentParams = {
  name: string;
  dateOfBirth: string;
  classroomId: number;
  teacherId: number;
};

export default class CreateAndEnrollStudent {
  async execute(params: ICreateAndEnrollStudentParams): Promise<IEnrollment> {
    const student = await makeCreateStudent().execute({
      name: params.name,
      dateOfBirth: params.dateOfBirth,
    });

    const startDate = new Date().toISOString();
    const endDate = new Date();
    endDate.setMonth(11);

    console.log(endDate.toISOString());

    return makeEnrollStudent().execute({
      studentId: student.id,
      startDate,
      endDate: endDate.toISOString(),
      classroomId: params.classroomId,
      teacherId: params.teacherId,
    });
  }
}
