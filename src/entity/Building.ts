import { BaseEntity } from "./BaseEntity";
import { EntityMetadata } from "./BaseEntityMetadata";

export default class Building extends BaseEntity{
    public id?: number = null;
    public id_starsystem?: number = null;
    public id_planet?: number = null;
    public id_slot?: number = null;
    public asset_code?: number = null;

    private static _Metadata?: EntityMetadata<Building>;
    public static get Metadata() {
      return Building._Metadata ??= new EntityMetadata<Building>({
        TableName: "building",
        PrimaryKey: "id",
        Constructor: this.constructor,
      });
    }

    public constructor(
        building?: Partial<Building>) {
            super();
            Object.assign(this, building);                             
    }
}
