import makeHttpClient from '../httpClient/HttpClientFactory';
import makeErrorHandler from '../errorHandler/ErrorHandlerFactory';
import ExamService from '@/src/infra/services/ExamService';

const makeExamService = () => {
  return new ExamService(makeHttpClient(), makeErrorHandler());
};

export default makeExamService;
