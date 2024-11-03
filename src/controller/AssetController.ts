import { Request, Response } from "express";
import {Asset} from "../entity/Asset";
import Global from "../Global";
import BaseDto from "../common/BaseDto";
import { ApiActionCode } from "../constants/Constants";
import { CommonError } from "../helper/Error";

class AssetDto extends BaseDto {
  public assetId: number;
  public item: Asset;
  public listItem: Asset[];

  public constructor(obj?: Partial<AssetDto>) {
    super(obj);
  }
}

export default class AssetController{
  public static async post(req: Request, res: Response) {
    let request = new AssetDto(req.body);
    let response = new AssetDto();

    switch (request.apiActionCode) {
      case ApiActionCode.CREATE:
        response.item = await Global.Dao.Insert(Asset, new Asset(request.item));
        break;
      case ApiActionCode.READ:
        response.item = await Global.Dao.SelectById(Asset, request.assetId);
        break;
      case ApiActionCode.READ_ALL:
        response.listItem = await Global.Dao.SelectAll(Asset);
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
}