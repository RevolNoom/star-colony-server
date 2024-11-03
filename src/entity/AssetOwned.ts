import { BaseEntity } from "./BaseEntity";
import { EntityMetadata } from "./BaseEntityMetadata";

export default class AssetOwned extends BaseEntity{
    public id_player: number;
    public asset_code: number;
    public count: number;

    private static _Metadata?: EntityMetadata<AssetOwned>;
    public static get Metadata() {
      return AssetOwned._Metadata ??= new EntityMetadata<AssetOwned>({
        TableName: "asset_owned",
        PrimaryKey: null,
        Constructor: this.constructor,
      })
    }
    public constructor(
        obj?: Partial<AssetOwned>) {
            super();
            Object.assign(this, obj);
    }
}
