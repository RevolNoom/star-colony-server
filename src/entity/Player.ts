import { BaseEntity } from "./BaseEntity";
import { EntityMetadata } from "./BaseEntityMetadata";


export default class Player extends BaseEntity{
    public id: number = null;
    public name: string = null;
    public credit: number = null;
    public valor: number = null;
    public last_active_utc: number = null;
    public id_starsystem: number = null;

    //#region Extends
    // public inventory?: Inventory;
    // public starsystem?: Starsystem;
    //#endregion

    private static _Metadata?: EntityMetadata<Player>;
    public static get Metadata() {
      return Player._Metadata ??= new EntityMetadata<Player>({
        TableName: "player",
        PrimaryKey: "id",
        Constructor: this.constructor,
      })
    }
    
    public constructor(obj?: Partial<Player>) {
      super();
      Object.assign(this, {...obj});
    }
}