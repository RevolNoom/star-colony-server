import { BaseEntity } from "./BaseEntity";

export class EntityMetadata<T extends BaseEntity>{  
  public readonly TableName: string;
  public readonly PrimaryKey?: string; // keyof T
  public readonly AutoIncrementedKey: boolean = false;
  public readonly Constructor: ((obj?: Partial<T>) => T)|Function;

  private readonly _Attributes: string[];
  public get Attributes(): ReadonlyArray<string> {
    return this._Attributes;
  }

  /** Used for one-time generation of attribute names */
  protected GetAttributeNames(): string[] {
    return [...Object.entries(this.Constructor()).map(entry => entry[0])]
  }

  public constructor(obj?: Partial<EntityMetadata<T>>) {
    Object.assign(this, {...obj});
    this._Attributes = this.GetAttributeNames();
  }
}