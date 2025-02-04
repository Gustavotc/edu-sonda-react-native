import FetchExamById from '@/src/domain/usecases/FetchExamById';
import makeExamService from '../services/ExamServiceFactory';

const makeFetchExameById = () => {
  return new FetchExamById(makeExamService());
};

export default makeFetchExameById;
