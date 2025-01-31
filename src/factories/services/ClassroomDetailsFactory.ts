import makeHttpClient from '../httpClient/HttpClientFactory';
import makeErrorHandler from '../errorHandler/ErrorHandlerFactory';
import ClassroomDetailsService from '@/src/infra/services/ClassroomDetailsService';

const makeClassroomDetails = () => {
  return new ClassroomDetailsService(makeHttpClient(), makeErrorHandler());
};

export default makeClassroomDetails;
