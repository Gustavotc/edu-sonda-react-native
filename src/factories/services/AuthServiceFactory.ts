import AuthService from '@/src/infra/services/AuthService';
import makeHttpClient from '../httpClient/HttpClientFactory';
import makeErrorHandler from '../errorHandler/ErrorHandlerFactory';

const makeAuthService = () => {
  return new AuthService(makeHttpClient(), makeErrorHandler());
};

export default makeAuthService;
