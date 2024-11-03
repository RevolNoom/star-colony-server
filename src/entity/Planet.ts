import { Transform3D } from "./Godot/Transform3d";
import { BaseEntity } from "./BaseEntity";
import { EntityMetadata } from "./BaseEntityMetadata";
import Global from "../Global";
import { Basis } from "./Godot/Basis";
import { Vector3 } from "./Godot/Vector3";
import { SqlPrimitiveType } from "../dao/BaseDao";

export default class Planet extends BaseEntity{
    //#region Primitives
    public id?: number = null;
    public id_player?: number = null;
    public id_starsystem?: number = null;
    public asset_code?: number = null;

    public bxx?: number = null; 
    public bxy?: number = null; 
    public bxz?: number = null;
    public byx?: number = null; 
    public byy?: number = null; 
    public byz?: number = null;
    public bzx?: number = null; 
    public bzy?: number = null; 
    public bzz?: number = null;
    public ox?: number = null; 
    public oy?: number = null; 
    public oz?: number = null;
    //#endregion

    //#region Extends
    public transform?: Transform3D;
    //#endregion

    private static _Metadata?: EntityMetadata<Planet>;
    public static get Metadata() {
      return Planet._Metadata ??= new EntityMetadata<Planet>({
        TableName: "planet",
        PrimaryKey: "id",
        Constructor: this.constructor,
      })
    }


    public constructor(
      obj?: Partial<Planet>) {
        super();
        Object.assign(this, obj);
    }
}
