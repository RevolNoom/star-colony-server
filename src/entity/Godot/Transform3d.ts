import { Basis } from "./Basis";
import { Vector3 } from "./Vector3";

export class Transform3D {
  public basis: Basis = new Basis();
  public origin: Vector3 = new Vector3();

  constructor(transform3D?: Transform3D) {
    Object.assign(this, transform3D);
  }
}