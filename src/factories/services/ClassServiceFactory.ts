import makeHttpClient from '../httpClient/HttpClientFactory';
import makeErrorHandler from '../errorHandler/ErrorHandlerFactory';
import ClassService from '@/src/infra/services/ClassService';

const makeClassService = () => {
  return new ClassService(makeHttpClient(), makeErrorHandler());
};

export default makeClassService;
