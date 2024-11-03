import { BaseEntity } from "./BaseEntity";
import { EntityMetadata } from "./BaseEntityMetadata";

export default class Starsystem extends BaseEntity{
    public id?: number = null;
    public ref_count?: number = null;

    private static _Metadata?: EntityMetadata<Starsystem>;
    public static get Metadata() {
        return Starsystem._Metadata ??= new EntityMetadata<Starsystem>({
            TableName: "starsystem",
            PrimaryKey: "id",
            Constructor: this.constructor,
        });
    }

    public constructor(obj?: Partial<Starsystem>) {
        super();
        Object.assign(this, {...obj});
    }
}

    