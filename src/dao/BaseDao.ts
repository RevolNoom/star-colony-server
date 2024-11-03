import { CommonError } from '../helper/Error';
import { BaseEntity, iBaseEntity } from '../entity/BaseEntity';

export type SqlPrimitiveType = string|number|null;

export type EntityDataType<T> = T|null;

// TODO: SELECT with columns argument
// TODO: Rollback

export abstract class BaseDao {
  // #region Select

  /** Return all rows in a table */
  public abstract SelectAll<T extends BaseEntity>(type: iBaseEntity<T>): Promise<T[]>;

  /** Return a row by ID */
  public abstract SelectById<T extends BaseEntity>(type: iBaseEntity<T>, id: SqlPrimitiveType): Promise<EntityDataType<T>>;

  /** Return multiple rows by a column*/
  public abstract SelectByColumn<T extends BaseEntity>(type: iBaseEntity<T>, column: (keyof T)|string, values: SqlPrimitiveType[]): Promise<T[]>;

  // #endregion

  // #region Update

  public abstract Update<T extends BaseEntity>(type: iBaseEntity<T>, item: EntityDataType<T>): Promise<void>;

  public abstract UpdateArray<T extends BaseEntity>(type: iBaseEntity<T>, itemArray: T[]): Promise<void>;

  // #endregion

  // #region Insert

  public abstract Insert<T extends BaseEntity>(type: iBaseEntity<T>, item: EntityDataType<T>): Promise<EntityDataType<T>>;

  public abstract InsertArray<T extends BaseEntity>(type: iBaseEntity<T>, itemArray: T[]): Promise<T[]>;

  // #endregion

  // #region Delete

  public abstract Delete<T extends BaseEntity>(type: iBaseEntity<T>, item: EntityDataType<T>): Promise<void>;

  public abstract DeleteById<T extends BaseEntity>(type: iBaseEntity<T>, id: SqlPrimitiveType): Promise<void>;

  public abstract DeleteArray<T extends BaseEntity>(type: iBaseEntity<T>, itemArray: T[]): Promise<void>;

  public abstract DeleteArrayId<T extends BaseEntity>(type: iBaseEntity<T>, id: SqlPrimitiveType[]): Promise<void>;

  // #endregion

  // #region Transaction

  public abstract StartTransaction(): Promise<void>;

  public abstract CommitTransaction(): void;

  // #endregion

  // #region Helper
  protected static argName(idx1: number, idx2?: number): string {
    return `id${idx1 ?? ""}_${idx2 ?? ""}`;
  } 

  protected static sqlArgName(idx1: number, idx2?: number): string {
    return ":" + BaseDao.argName(idx1, idx2);
  }

  protected static GenerateInsertUpdateValueObject<T extends BaseEntity>(type: iBaseEntity<T>, itemArray: T[]): any {
    let valueObject = {}
    itemArray.forEach((item, idx1) => 
      type.Metadata.Attributes.forEach((attr, idx2) => 
        valueObject[BaseDao.argName(idx1, idx2)] = item[attr]
      ));
    return valueObject;
  }

  protected static UnionItemArray<T extends BaseEntity>(type: iBaseEntity<T>, itemArray: T[]): string {
    if (itemArray.length === 0) {
      throw CommonError.InvalidArgument("Empty item array")
    }
    
    let firstRow = "SELECT " + type.Metadata.Attributes.map((attr, index) => `${BaseDao.sqlArgName(0, index)} AS ${attr}`).join();
    let restRows = itemArray.slice(1).map((item, index) => 
      "SELECT " + type.Metadata.Attributes.map((attr, attrIdx) => BaseDao.sqlArgName(index, attrIdx)).join());
    let sqlQuery = [firstRow, ...restRows].join("\nUNION ");

    return sqlQuery;
  }


  // #endregion
}