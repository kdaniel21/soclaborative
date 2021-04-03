export interface StorageService {
  get(key: string): Promise<any>;
  set(data: string): Promise<void>;
  remove(key: string): Promise<void>;
}
