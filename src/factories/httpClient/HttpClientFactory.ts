import AxiosHttpClient from '@/src/infra/httpClient/AxiosHttpClient';

const makeHttpClient = () => {
  return new AxiosHttpClient();
};

export default makeHttpClient;
