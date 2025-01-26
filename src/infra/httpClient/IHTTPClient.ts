export interface IRequestOption {
  readonly method: 'get' | 'delete' | 'post' | 'put' | 'patch';
  readonly url: string;
  readonly headers?: any;
  readonly body?: any;
}

type IResponse<T> =
  | {
      data: T;
      error: null;
    }
  | { data: null; error: { code: number; message: string } };

type IPaginatedResponse<T> = {
  data: T;
  error: null;
  total_page: number;
  per_page: number;
  page: number;
};

interface IHttpClient {
  request<Response>(
    requestOption: IRequestOption,
  ): Promise<IHttpResponse<Response>>;
}

type IHttpResponse<T> = {
  code: number;
  data: T;
};

export { IHttpClient, IResponse, IPaginatedResponse, IHttpResponse };
