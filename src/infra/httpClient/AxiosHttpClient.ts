import axios, { isAxiosError } from 'axios';
import { IHttpClient, IHttpResponse, IRequestOption } from './IHTTPClient';

class AxiosHttpClient implements IHttpClient {
  async request<Response>(
    option: IRequestOption,
  ): Promise<IHttpResponse<Response>> {
    try {
      const response = await axios<Response>({
        method: option.method,
        url: option.url,
        headers: option.headers,
        data: option.body,
      });

      return {
        code: response.status,
        data: response.data,
      };
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          return {
            code: error.response.status,
            data: error.response.data,
          };
        }
      }

      throw new Error('Unexpected request error');
    }
  }
}

export default AxiosHttpClient;
