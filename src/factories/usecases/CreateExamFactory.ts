import CreateExam from '@/src/domain/usecases/CreateExam';
import makeExamService from '../services/ExamServiceFactory';

const makeCreateExam = () => {
  return new CreateExam(makeExamService());
};

export default makeCreateExam;
