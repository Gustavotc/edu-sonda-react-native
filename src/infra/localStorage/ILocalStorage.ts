export interface ILocalStorage {
  getString(key: string): Promise<string | null>;
  getObject<T>(key: string): Promise<T | null>;
  setObject(key: string, value: object): Promise<void>;
  clearKey(key: string): Promise<void>;
}
