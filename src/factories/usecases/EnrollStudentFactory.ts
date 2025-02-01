import EnrollStudent from '@/src/domain/usecases/EnrollStudent';
import makeEnrollmentService from '../services/EnrollmentServiceFactory';

const makeEnrollStudent = () => {
  return new EnrollStudent(makeEnrollmentService());
};

export default makeEnrollStudent;
