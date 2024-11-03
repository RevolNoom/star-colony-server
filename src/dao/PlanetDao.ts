import { Basis } from "../entity/Godot/Basis";
import { Transform3D } from "../entity/Godot/Transform3d";
import { Vector3 } from "../entity/Godot/Vector3";
import Planet from "../entity/Planet";
import Global from "../Global";
import { SqlPrimitiveType } from "./BaseDao";

export class PlanetDao {
    public static async SelectById(id: SqlPrimitiveType): Promise<Planet|null> {
        if (id === null || id === undefined) {
          return null;
        }
  
        let planet = await Global.Dao.SelectById(Planet, id);
        if (planet === null) {
          return null;
        }
        planet.transform = new Transform3D({
          basis: new Basis({
            x: new Vector3({x: planet.bxx, y: planet.bxy, z: planet.bxz}),
            y: new Vector3({x: planet.byx, y: planet.byy, z: planet.byz}),
            z: new Vector3({x: planet.bzx, y: planet.bzy, z: planet.bzz}),
          }),
          origin: new Vector3({x: planet.ox, y: planet.oy, z: planet.oz}),
        });
        return planet;
    }

    public static async SelectByPlayer(id_player: SqlPrimitiveType): Promise<Planet[]> {
    if (id_player === null || id_player === undefined) {
        return [];
    }

    let planets = await Global.Dao.SelectByColumn(Planet, "id_player", [id_player]);
    planets.forEach(planet => {
        planet.transform = new Transform3D({
        basis: new Basis({
            x: new Vector3({x: planet.bxx, y: planet.bxy, z: planet.bxz}),
            y: new Vector3({x: planet.byx, y: planet.byy, z: planet.byz}),
            z: new Vector3({x: planet.bzx, y: planet.bzy, z: planet.bzz}),
        }),
        origin: new Vector3({x: planet.ox, y: planet.oy, z: planet.oz}),
        });
    });

    return planets;
    }
}