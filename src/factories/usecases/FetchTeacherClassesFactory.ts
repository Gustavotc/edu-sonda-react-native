import makeClassService from '../services/ClassServiceFactory';
import FetchTeacherClasses from '@/src/domain/usecases/FetchTeacherClasses';

const makeFetchTeacherClasses = () => {
  return new FetchTeacherClasses(makeClassService());
};

export default makeFetchTeacherClasses;
