import FetchStudentsByClassroomId from '@/src/domain/usecases/FetchStudentsByClassroomId';
import makeEnrollmentService from '../services/EnrollmentServiceFactory';

const makeFetchStudentsByClassroomId = () => {
  return new FetchStudentsByClassroomId(makeEnrollmentService());
};

export default makeFetchStudentsByClassroomId;
