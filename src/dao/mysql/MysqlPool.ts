import * as mysql from 'mysql2/promise';
import { CommonError, SqlError } from '../../helper/Error';

export class iMysqlEntity {
  
}

export abstract class MysqlEntity {
  constructor(iEntity: iMysqlEntity) {}

  /** OVERRIDE ME! 
   * 
   * Returns true if data to be updated into DB is valid.
   * 
   * Usually, this means id is NULL and other attributes are non-null*/
  protected _isInsertValid(): boolean 
  {
      return true;
  }

  /** OVERRIDE ME! 
   * 
   * Returns true if data to be updated into DB is valid.
   * 
   * Usually, this means id is non-NULL and other attributes are non-null*/
  protected _isUpdateValid(): boolean
  {
      return true;
  }

  /** Throw if data to be inserted into DB is invalid */
  protected doInsertValidation() {
    if (!this._isInsertValid()) {
      SqlError.InvalidInsertion();
    }
  }

  /** Throw if data to be updated into DB is invalid */
  protected doUpdateValidation() {
    if (!this._isUpdateValid()) {
      SqlError.InvalidUpdation();
    }
  }

}

export const connectionPool = mysql.createPool({
  host: 'localhost',
  user: 'star_colony_dev',
  password1: 'mysqlpassword',
  database: 'star_colony',
  waitForConnections: false,
  connectionLimit: 1000,
  maxIdle: 100, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 30000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  namedPlaceholders: true,
});