import InternalError from '@/src/domain/errors/InternalError';
import { IResponse } from '../httpClient/IHTTPClient';
import { IErrorHandler } from './IErrorHandler';

export default class BaseErrorHandler implements IErrorHandler {
  handle<T>(httpResponse: IResponse<T>): T {
    if (httpResponse.error) {
      throw new InternalError(
        httpResponse.error.code,
        httpResponse.error.message,
      );
    }

    return httpResponse.data;
  }
}
