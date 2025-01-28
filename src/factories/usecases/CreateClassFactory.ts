import CreateClass from '@/src/domain/usecases/CreateClass';
import makeClassService from '../services/ClassServiceFactory';

const makeCreateClass = () => {
  return new CreateClass(makeClassService());
};

export default makeCreateClass;
