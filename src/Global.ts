import { MysqlDao } from "./dao/mysql/MysqlDao";

export default class Global {
    public static get Dao() {
        return new MysqlDao();
    } 
}