import { SqlError } from '../../helper/Error';
import { BaseEntity, iBaseEntity } from '../../entity/BaseEntity';
import { BaseDao, EntityDataType, SqlPrimitiveType } from '../BaseDao';
import { connectionPool } from './MysqlPool';
import { PoolConnection , RowDataPacket} from 'mysql2/promise';
import { ErrorMessages } from '../../constants/Constants';

export class MysqlDao extends BaseDao {

  public async StartTransaction(): Promise<void> {
    let connection = await this.GetConnection();
    connection.beginTransaction();
    this._isTransaction = true;
  }

  public CommitTransaction(): void {
    this._connection.commit();
    this._isTransaction = false;
    this.ReleaseConnection();
  }

  public async SelectAll<T extends BaseEntity>(
    type: iBaseEntity<T>): Promise<T[]> {    
    let connection: PoolConnection;
    let Metadata = type.Metadata;
    try {
      connection = await this.GetConnection();
      let queryStr = `SELECT * FROM ${Metadata.TableName}`
      const [rows, fields] = await connection.execute(queryStr);
      let result = rows as RowDataPacket[];
      return result.map(row => Metadata.Constructor({...(row as any)}));
    }
    finally {
      if (this._isTransaction === false) {
        this.ReleaseConnection();
      }
    }
  }

  public async SelectById<T extends BaseEntity>(
    type: iBaseEntity<T>, 
    id: (SqlPrimitiveType)): Promise<EntityDataType<T>> {
    if (id === null)
      return null;
    
    let result = await this.SelectByColumn(type, type.Metadata.PrimaryKey, [id]);
    if (result.length > 1) {
      throw new SqlError(ErrorMessages.UNKNOWN_ERROR);
    }
    return result.length === 0? null : result[0];
  }

  public async SelectByColumn<T extends BaseEntity>(
    type: iBaseEntity<T>, 
    column: (keyof T)|string,
    values: SqlPrimitiveType[]): Promise<T[]> {
    if (values.length === 0)
      return [];

    let columnName = String(column); // Must use String() or it'll cause TypeError.
    
    let connection: PoolConnection;
    let Metadata = type.Metadata;
    try {
      connection = await this.GetConnection();
      let queryStr = `
  SELECT * FROM ${Metadata.TableName}
  WHERE ${Metadata.TableName}.${columnName} IN (${values.map((v, idx) => BaseDao.sqlArgName(idx)).join()})`;
      
      let valueObject = {};
      values.forEach((v, idx) => valueObject[columnName] = v);

      const [rows, fields] = await connection.execute(queryStr, valueObject);
      return (rows as RowDataPacket[]).map(row => Metadata.Constructor({...(row as any)}));
    }
    finally {
      if (this._isTransaction === false) {
        this.ReleaseConnection();
      }
    }
  }

  public async Update<T extends BaseEntity>(type: iBaseEntity<T>, item: EntityDataType<T>): Promise<void> {
    if (item === null)
      return null;
    
    return this.UpdateArray(type, [item]);
  }

  public async UpdateArray<T extends BaseEntity>(type: iBaseEntity<T>, itemArray: T[]): Promise<void> {
    let Metadata = type.Metadata;
    if (itemArray.findIndex(item => item[Metadata.PrimaryKey] === null) !== -1) {
      throw SqlError.NullPrimaryKey();
    }
    let connection: PoolConnection;
    try {
      connection = await this.GetConnection();

      let queryStr = `
  WITH itemArray AS (${BaseDao.UnionItemArray(type, itemArray)})
  UPDATE ${Metadata.TableName} INNER JOIN itemArray
  SET ${Metadata.Attributes.map(attr => `${Metadata.TableName}.${attr} = itemArray.${attr}`).join()}
  WHERE ${Metadata.TableName}.${Metadata.PrimaryKey} = itemArray.${Metadata.PrimaryKey}`;

      let valueObject = BaseDao.GenerateInsertUpdateValueObject(type, itemArray);

      const [rows, fields] = await connection.execute(queryStr, valueObject);
    }
    finally {
      if (this._isTransaction === false) {
        this.ReleaseConnection();
      }
    }
  }

  public async Insert<T extends BaseEntity>(type: iBaseEntity<T>, item: EntityDataType<T>): Promise<EntityDataType<T>> {
    let Metadata = type.Metadata;

    // TODO: Check AutoIncremented
    if (item === null || item[Metadata.PrimaryKey] === null)
      return null;
    
    // TODO: Return item with new id
    //return this.InsertArray(type, [item]);
    return item;
  }

  public async InsertArray<T extends BaseEntity>(type: iBaseEntity<T>, itemArray: T[]): Promise<T[]> {
    let Metadata = type.Metadata;
    if (itemArray.length === 0) {
      return [];
    }
    // if (itemArray.findIndex(item => item[type.PrimaryKey] === undefined) !== -1) {
    //   throw SqlError.NullPrimaryKey();
    // }
    let connection: PoolConnection;
    try {
      connection = await this.GetConnection();
      let valueObject = BaseDao.GenerateInsertUpdateValueObject(type, itemArray);
      
      let queryStr = `
  INSERT INTO ${Metadata.TableName} (${Metadata.Attributes.join()})
  VALUES ${itemArray.map((item, idx1) => 
    `(${Metadata.Attributes.map((attr, idx2) => BaseDao.sqlArgName(idx1, idx2)).join()})`
  ).join()}`;

      const [rows, fields] = await connection.execute(queryStr, valueObject);

      // TODO: Return item array with new ids
      return [];
    }
    finally {
      if (this._isTransaction === false) {
        this.ReleaseConnection();
      }
    }
  }

  public async Delete<T extends BaseEntity>(type: iBaseEntity<T>, item: EntityDataType<T>): Promise<void> {
    if (item === null)
      return;
    let Metadata = type.Metadata;
    
    return this.DeleteArrayId(type, [item[Metadata.PrimaryKey]]);
  }

  public async DeleteById<T extends BaseEntity>(type: iBaseEntity<T>, id: SqlPrimitiveType): Promise<void> {
    if (id === null)
      return;
    
    return this.DeleteArrayId(type, [id]);
  }

  public async DeleteArray<T extends BaseEntity>(type: iBaseEntity<T>, itemArray: T[]): Promise<void> {
    let Metadata = type.Metadata;
    if (itemArray.findIndex(item => item[Metadata.PrimaryKey] === null) === -1) {
      throw SqlError.NullPrimaryKey();
    }
    return this.DeleteArrayId(type, itemArray.map(item => item[Metadata.PrimaryKey]));
  }

  public async DeleteArrayId<T extends BaseEntity>(type: iBaseEntity<T>, idArray: (string|number)[]): Promise<void> {
    if (idArray.length === 0) {
      return;
    }
    let Metadata = type.Metadata;

    let connection: PoolConnection;
    try {
      connection = await this.GetConnection();
      let valueObject: any = {};
      idArray.forEach((id, idx) => valueObject[BaseDao.argName(idx)] = id);

      let queryStr = `
  DELETE FROM ${Metadata.TableName}
  WHERE ${Metadata.TableName}.${Metadata.PrimaryKey} IN (${idArray.map((_, idx) => BaseDao.sqlArgName(idx)).join()})`;

      const [rows, fields] = await connection.execute(queryStr, valueObject);
      return;
    }
    finally {
      if (this._isTransaction === false) {
        this.ReleaseConnection();
      }
    }
  }

  protected ReleaseConnection() {
    connectionPool.releaseConnection(this._connection);
    this._connection = undefined;
  }

  protected async GetConnection(): Promise<PoolConnection> {
    this._connection ??= await connectionPool.getConnection();
    return this._connection;
  }

  protected _connection: PoolConnection | undefined;
  
  /** If _isTransaction is `true`, _connection won't be released after query */
  protected _isTransaction: boolean = false;

}