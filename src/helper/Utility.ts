export default class Utility{
    public static parseInt(numberString?: string): number|undefined{
        if (numberString === undefined){
            return undefined;
        }
        return Number.parseInt(numberString);
    }


    public static padZero(num: number): string{
        return num < 10? `0${num}` : `${num}`;
    }


    public static hasValue(obj: any): boolean {
        return obj !== undefined && obj !== null;
    }


    public static coerceToDate(date: Date|string|undefined|null): Date|undefined {
        if (date === undefined || date === null) {
            return undefined;
        }
        if (typeof date === "string")
        {
            return new Date(Date.parse(date));
        }
        return date;
    }

    // Return ISO8601 string of now() in UTC 
    // 2024-04-07T15:49:29Z
    public static getDateNow(): string {
        let date = new Date(Date.now());
        return date.toISOString();
    }


    public static convertDateToMysqlDate(date?: Date|string): string {
        if (date === undefined){
            return 'NULL';
        }
        let result = date;
        if (typeof result !== "string"){
            result = result.toISOString();
        }
        return `${(result as string).replace("T", " ").replace("Z", " ")}`;
    }


    // Reinterpret local time as UTC
    public static reinterpretAsUtc(iso8601String?: string): string|undefined {
        if (iso8601String === undefined){
            return undefined;
        }
        
        return iso8601String + (iso8601String.endsWith("Z") ? "" : "Z");
    }
}

export interface iKeyValuePair<K, V> {
    Key: K,
    Value: V
}
