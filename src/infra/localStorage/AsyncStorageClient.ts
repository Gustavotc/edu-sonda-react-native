import { ILocalStorage } from './ILocalStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AsyncStorageClient implements ILocalStorage {
  async getString(key: string): Promise<string | null> {
    try {
      return AsyncStorage.getItem(key);
    } catch {
      return null;
    }
  }

  async getObject<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch {
      return null;
    }
  }

  async setString(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch {
      return;
    }
  }

  async setObject(key: string, value: object): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch {
      return;
    }
  }

  async clearKey(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch {
      return;
    }
  }
}
