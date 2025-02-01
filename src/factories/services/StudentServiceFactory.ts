import makeHttpClient from '../httpClient/HttpClientFactory';
import makeErrorHandler from '../errorHandler/ErrorHandlerFactory';
import StudentService from '@/src/infra/services/StudentService';

const makeStudentService = () => {
  return new StudentService(makeHttpClient(), makeErrorHandler());
};

export default makeStudentService;
