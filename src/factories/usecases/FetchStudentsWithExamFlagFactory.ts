import FetchStudentsWithExamFlag from '@/src/domain/usecases/FetchStudentsWithExamFlag';
import makeStudentService from '../services/StudentServiceFactory';

const makeFetchStudentsWithExamFlag = () => {
  return new FetchStudentsWithExamFlag(makeStudentService());
};

export default makeFetchStudentsWithExamFlag;
