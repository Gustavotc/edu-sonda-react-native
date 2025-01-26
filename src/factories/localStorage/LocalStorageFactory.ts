import AsyncStorageClient from '@/src/infra/localStorage/AsyncStorageClient';

const makeLocalStorage = () => {
  return new AsyncStorageClient();
};

export default makeLocalStorage;
