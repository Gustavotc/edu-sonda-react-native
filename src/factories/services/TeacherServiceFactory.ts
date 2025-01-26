import TeacherService from '@/src/infra/services/TeacherService';
import makeHttpClient from '../httpClient/HttpClientFactory';
import makeErrorHandler from '../errorHandler/ErrorHandlerFactory';

const makeTeacherService = () => {
  return new TeacherService(makeHttpClient(), makeErrorHandler());
};

export default makeTeacherService;
