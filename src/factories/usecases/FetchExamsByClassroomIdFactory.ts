import FetchExamsByClassroomId from '@/src/domain/usecases/FetchExamsByClassroomId';
import makeExamService from '../services/ExamServiceFactory';

const makeFetchExamsByClassroomId = () => {
  return new FetchExamsByClassroomId(makeExamService());
};

export default makeFetchExamsByClassroomId;
