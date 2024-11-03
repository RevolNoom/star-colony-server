import { EntityMetadata } from "./BaseEntityMetadata";

export interface iBaseEntity<T extends BaseEntity> {
  get Metadata(): EntityMetadata<T>;
}

export abstract class BaseEntity {
  public static get Metadata(): EntityMetadata<BaseEntity> {
    return new EntityMetadata<BaseEntity>({});
  }
}