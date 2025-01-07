import AsyncStorage from "@react-native-async-storage/async-storage";

interface StorageProps {
    set(key: string, value: any): Promise<void>;
    get<T>(key: string): Promise<T | null>;
    remove(key: string): Promise<void>;
    clear(): Promise<void>;
    getAllKeys(): Promise<string[]>;
  }
  
  class StorageError extends Error {
    constructor(message: string, public originalError?: Error) {
      super(message);
      this.name = 'StorageError';
    }
  }
  
  export const storage: StorageProps = {
    async set(key: string, value: any): Promise<void> {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
      } catch (error) {
        throw new StorageError(
          `Failed to store value for key: ${key}`,
          error as Error
        );
      }
    },
  
    async get<T>(key: string): Promise<T | null> {
      try {
        const jsonValue = await AsyncStorage.getItem(key);
        if (jsonValue === null) {
          return null;
        }
        return JSON.parse(jsonValue) as T;
      } catch (error) {
        throw new StorageError(
          `Failed to retrieve value for key: ${key}`,
          error as Error
        );
      }
    },
  
    async remove(key: string): Promise<void> {
      try {
        await AsyncStorage.removeItem(key);
      } catch (error) {
        throw new StorageError(
          `Failed to remove value for key: ${key}`,
          error as Error
        );
      }
    },
  
    async clear(): Promise<void> {
      try {
        await AsyncStorage.clear();
      } catch (error) {
        throw new StorageError(
          'Failed to clear storage',
          error as Error
        );
      }
    },
  
    async getAllKeys(): Promise<string[]> {
      try {
        const keys = await AsyncStorage.getAllKeys();
        return [...keys];
      } catch (error) {
        throw new StorageError(
          'Failed to get all keys',
          error as Error
        );
      }
    },
  };