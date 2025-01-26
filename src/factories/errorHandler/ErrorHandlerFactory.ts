import BaseErrorHandler from '@/src/infra/errorHandlers/ErrorHandler';

const makeErrorHandler = () => {
  return new BaseErrorHandler();
};

export default makeErrorHandler;
