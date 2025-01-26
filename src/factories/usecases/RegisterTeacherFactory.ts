import RegisterTeacher from '@/src/domain/usecases/RegisterTeacher';
import makeTeacherService from '../services/TeacherServiceFactory';

const makeRegisterTeacher = () => {
  return new RegisterTeacher(makeTeacherService());
};

export default makeRegisterTeacher;
