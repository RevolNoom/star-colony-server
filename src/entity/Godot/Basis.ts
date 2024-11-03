import { Vector3 } from "./Vector3";

export class Basis {
  public x: Vector3 = Vector3.RIGHT;
  public y: Vector3 = Vector3.UP;
  public z: Vector3 = Vector3.BACK;

  constructor(basis?: Partial<Basis>) {
    Object.assign(this, basis);
  }
}