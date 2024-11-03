import { Request, Response } from "express";
import PlayerBiz from "../biz/PlayerBiz";
import BaseDto from "../common/BaseDto";
import { ApiActionCode } from "../constants/Constants";
import { Asset } from "../entity/Asset";
import Global from "../Global";
import { CommonError } from "../helper/Error";
import Player from "../entity/Player";

class PlayerDto extends BaseDto {
    public assetId: number;
    public item: Player;
  
    public constructor(obj?: Partial<PlayerDto>) {
      super(obj);
      Object.assign(this, obj);
    }
}

export default class PlayerController{
    public static async post(req: Request, res: Response) {
        let request = new PlayerDto(req.body);
        let response = new PlayerDto();
    
        switch (request.apiActionCode) {
          case ApiActionCode.CREATE:
            // response.item = await Global.Dao.Insert(Asset, new Asset(request.item));
            break;
          case ApiActionCode.READ:
            // response.item = await Global.Dao.SelectById(Asset, request.assetId);
            break;
          case ApiActionCode.READ_ALL:
            // response.listItem = await Global.Dao.SelectAll(Asset);
            break;
          case ApiActionCode.UPDATE:
            await Global.Dao.Update(Asset, new Asset(request.item));
            break;
          case ApiActionCode.DELETE:
            await Global.Dao.DeleteById(Asset, request.assetId);
            break;
          default:
            throw CommonError.NotImplementedException(request.apiActionCode);
        }
    
        return res.status(200).json(response);
      }
  /** Create new player. URL doesn't require any argument.
    * 
    * Respond with the data of the newly created player.
    * 
    * TODO: Create a default base.
    */
  public static create(req, res) {
    PlayerBiz
    .create()
    .then((player) => {
      return res.status(200).json({player});})
    .catch(
      (ex: CommonError) => {
        return res.status(500).json({error: ex.message});
      }
    );
  }

//   /** 
//    * Respond with the existing player data.
//    * 
//    * URL arguments:
//    * @player_id: ID of the player to get
//   */
//   public static async read(req, res) {
//     let queryData = url.parse(req.url, true).query;
//     if (queryData.player_id === undefined) {
//       return res.status(500).json({
//         error: `Missing player_id.`,
//       });
//     }

//     let player_id = Number(queryData.player_id);
//     Player.read(player_id)
//     .then((player) => {
//       if (player === null)
//       {
//         return res.status(500).json({error: `Player ${player_id} not found`});
//       }
//       return res.status(200).json({player});
//     })
//     .catch(
//       (ex: Error) => {
//         return res.status(500).json({error: ex.message,
//           stack: ex.stack,
//         });
//       }
//     );
//   }


//   public static update(req, res) {
//     let concatStream = concat((reqBody) => {
//       let jsonBody = JSON.parse(reqBody);
//       let player = new Player({...jsonBody.player});
//       return player
//       .update()
//       .then(async () => {
//         let p = player;
//         return res.status(200).json({
//           player: p
//         });
//       })
//       .catch(
//         (ex: CommonError) => {
//           return res.status(500).json({
//             error: ex.message,
//             stack: ex.stack,
//           });
//         }
//       )
//       .catch(
//         (ex) => {
//           return res.status(500).json({error: ex,
//             stack: ex.stack,});
//         }
//       );
//     });
//     req.pipe(concatStream);
//     req.on('error', (error) => {
//       return res.status(500).json({ error });
//     });
//   }

  
//   /** 
//    * Respond with the opponent data and base scene.
//    * 
//    * URL arguments:
//    * @player_id: ID of the player who wants to find an opponent
//   */
//   public static findMatch(req, res) {
//     let queryData = url.parse(req.url, true).query;
//     if (queryData.player_id === undefined) {
//       return res.status(500).json({
//         error: `No query ID received.`,
//       });
//     }

//     return Player.read(Number(queryData.player_id))
//     .then((player) => {
//         return player.findMatch();
//     })
//     .then((opponent) => {
//       if (opponent === null)
//       {
//         return res.status(500).json({message: "No suitable opponent found."});
//       }
//       return res.status(200).json({player: opponent});
//     })
//     .catch(
//       (ex: CommonError) => {
//         return res.status(500).json({error: ex.message,
//           stack: ex.stack,});
//       }
//     );
//   }


//   public static purgeDb(req, res) {
//     return Player.purgeDb()
//     .then((_) => {
//       return res.status(200).json({
//         message: "Done"
//       });
//     })
//     .catch((error) => {
//       return res.status(500).json({
//         error: error.toString(),
//       });
//     })
//   }
}