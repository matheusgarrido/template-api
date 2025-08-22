export abstract class IRepository<T> {
  protected list: T[] = [];

  abstract create(obj: Partial<T>): T;

  abstract findById(id: string): T | null;

  abstract findOne(obj: Partial<T>): T | null;

  abstract findAll(): T[];
}
