import { BaseEntity } from "./BaseEntity";
import { EntityMetadata } from "./BaseEntityMetadata";

export class Asset extends BaseEntity {
  public id?: number = null;
  public name?: string = null;
  public code?: number = null;
  public cost_credit?: number = null;
  public cost_valor?: number = null;

  private static _Metadata?: EntityMetadata<Asset>;
  public static get Metadata() {
    return Asset._Metadata ??= new EntityMetadata<Asset>({
      TableName: "asset",
      PrimaryKey: "id",
      Constructor: this.constructor,
    })
  }
  
  public constructor(obj?: Partial<Asset>) {
    super();
    Object.assign(this, {...obj});
  }
};

export enum AssetCode {

    //#region Units
    Fighter = 0,

    //#region Planets
    Tetrahedron = 10000,
    Hexahedron = 10001,
    Octahedron = 10002,
    Dodecahedron = 10003,

    //#region Buildings
    Headquarter = 20000,
    Reactor = 20001,
    ResearchCenter = 20002,
    FleetCommand = 20003,
}