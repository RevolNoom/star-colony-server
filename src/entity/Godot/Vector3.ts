/// This file contains interfaces to GodotEngine objects

export class Vector3 {
  public x: number = 0;
  public y: number = 0;
  public z: number = 0;

  constructor(vector3?: Partial<Vector3>) {
    Object.assign(this, vector3);
  }

  public static readonly ZERO: Vector3 =    new Vector3();
  public static readonly ONE: Vector3 =     new Vector3({x: 1, y: 1, z: 1});
  public static readonly INF: Vector3 =     new Vector3({x: Infinity, y: Infinity, z: Infinity});
  public static readonly LEFT: Vector3 =    new Vector3({x: -1, y: 0, z: 0});
  public static readonly RIGHT: Vector3 =   new Vector3({x: 1, y: 0, z: 0});
  public static readonly UP: Vector3 =      new Vector3({x: 0, y: 1, z: 0});
  public static readonly DOWN: Vector3 =    new Vector3({x: 0, y: -1, z: 0});
  public static readonly FORWARD: Vector3 = new Vector3({x: 0, y: 0, z: -1});
  public static readonly BACK: Vector3 =    new Vector3({x: 0, y: 0, z: 1});
}