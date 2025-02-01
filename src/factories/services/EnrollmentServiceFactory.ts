import makeHttpClient from '../httpClient/HttpClientFactory';
import makeErrorHandler from '../errorHandler/ErrorHandlerFactory';
import EnrollmentService from '@/src/infra/services/EnrollmentService';

const makeEnrollmentService = () => {
  return new EnrollmentService(makeHttpClient(), makeErrorHandler());
};

export default makeEnrollmentService;
