import { Request, Response } from "express";

export class Middleware {
  /** Catch and print error to console, or log to database */
  public static ErrorHandler(err: Error, _req: Request, res: Response, _next) {
    console.error(err.stack)
    res.status(500).send(err.message);
  }
}