import CreateStudent from '@/src/domain/usecases/CreateStudent';
import makeStudentService from '../services/StudentServiceFactory';

const makeCreateStudent = () => {
  return new CreateStudent(makeStudentService());
};

export default makeCreateStudent;
