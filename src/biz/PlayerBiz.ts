import { AssetCode } from "../entity/Asset";
import AssetOwned from "../entity/AssetOwned";
import Building from "../entity/Building";
import { Transform3D } from "../entity/Godot/Transform3d";
import Planet from "../entity/Planet";
import Player from "../entity/Player";
import Starsystem from "../entity/Starsystem";
import Global from "../Global";

export default class PlayerBiz {
    public static async create(): Promise<Player> {
        let player = new Player(
        {
            name: `New Player ${Date.now()}`,
            last_active_utc: Date.now(), 
            credit: 100000,
            valor: 10000,
        });

        let starsystem = new Starsystem({
            ref_count: 1,
        });

        let newPlanet = new Planet({
            asset_code: AssetCode.Dodecahedron,
            transform: new Transform3D(),
        });

        let newHQ = new Building({
            asset_code: AssetCode.Headquarter,
            id_slot: 0,
        });
        let newRC = new Building({
            asset_code: AssetCode.ResearchCenter,
            id_slot: 1,
        });
        let newReactor = new Building({
            asset_code: AssetCode.Reactor,
            id_slot: 2,
        });
        let newFleetCommand = new Building({
            asset_code: AssetCode.FleetCommand,
            id_slot: 3,
        });

        let ownedFighter = new AssetOwned({
            asset_code: AssetCode.Fighter,
            count: 100,
        });

        let dao = Global.Dao;
        let buildings = [newHQ, newFleetCommand, newReactor, newRC];
        try {
            await dao.StartTransaction();
            starsystem = await dao.Insert(Starsystem, starsystem);

            player.id_starsystem = starsystem.id;
            player = await dao.Insert(Player, player);

            newPlanet.id_starsystem = starsystem.id;
            buildings.forEach(building => {
                building.id_starsystem = starsystem.id;
            });

            newPlanet = await dao.Insert(Planet, newPlanet);
            buildings = await dao.InsertArray(Building, buildings);
            ownedFighter = await dao.Insert(AssetOwned, ownedFighter);
            dao.CommitTransaction();
        }
        finally {
            
        }
        return player;
    }

//     /** Get a random opponent */
//     public async findMatch(preferrableOpponentDifficulty = PreferrableOpponentDifficulty.default): Promise<Player|undefined>
//     {
//         return;
//         // if (!Utility.hasValue(this.id)) {
//         //     Exception.OperationNotPermitted();
//         // }

//         // let valorBound = preferrableOpponentDifficulty.getRangeOf(this.valor);

//         // // NOTE: ORDER BY RAND() is slow. Need to find another way when I have time
//         // let connection = await mysql.connectionPool.getConnection();
//         // return connection
//         // .query(`
//         //     SELECT *
//         //     FROM 
//         //         player 
//         //     WHERE 
//         //         id != :id 
//         //         AND valor >= :least_valor_bound
//         //         AND valor <= :most_valor_bound
//         //     ORDER BY RAND()
//         //     LIMIT 1;`,
//         //     {
//         //         id: this.id,
//         //         least_valor_bound: valorBound.least,
//         //         most_valor_bound: valorBound.most,
//         //     })
//         // .then(([rows, fields]) => {
//         //     let player = mysql.convertTo(Player, rows as RowDataPacket[])[0];
//         //     return Player.read(player.id);
//         // })
//         // .finally(() => {
//         //     mysql.connectionPool.releaseConnection(connection);
//         // });
//     }

}
