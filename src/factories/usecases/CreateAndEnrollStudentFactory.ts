import CreateAndEnrollStudent from '@/src/domain/usecases/CreateAndEnrollStudent';

const makeCreateAndEnrollStudent = () => {
  return new CreateAndEnrollStudent();
};

export default makeCreateAndEnrollStudent;
