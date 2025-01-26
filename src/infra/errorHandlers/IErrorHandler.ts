import { IResponse } from '../httpClient/IHTTPClient';

export interface IErrorHandler {
  handle: <T>(httpResponse: IResponse<T>) => T;
}
