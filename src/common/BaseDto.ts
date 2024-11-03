import { ApiActionCode } from "../constants/Constants";

export default class BaseDto {
  public apiActionCode: ApiActionCode;

  public constructor(obj?: Partial<BaseDto>) {
    Object.assign(this, obj);
  }
}