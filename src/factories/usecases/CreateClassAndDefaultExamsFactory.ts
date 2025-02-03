import CreateClassAndDefaultExams from '@/src/domain/usecases/CreateClassAndDefaultExams';
import makeClassService from '../services/ClassServiceFactory';
import makeCreateExam from './CreateExamFactory';

const makeCreateClassAndDefaultExams = () => {
  return new CreateClassAndDefaultExams(makeClassService(), makeCreateExam());
};

export default makeCreateClassAndDefaultExams;
