import express from "express";
// import PlayerController from "./src/controller/PlayerController";
import AssetController from "./src/controller/AssetController";
import { Middleware } from "./src/middlewares/Middlewares";

let app = express();

//#region Middleware

app.use(express.json());    // parse request body as JSON
app.use(Middleware.ErrorHandler);

//#endregion

//#region Api endpoints

/// PlayerController
// app.post("/player/create", PlayerController.create);
// app.get("/player/read", PlayerController.read);
// app.get("/player/findMatch", PlayerController.findMatch);
// //app.put("/player/buy", PlayerController.buy);
// app.put("/player/update", PlayerController.update);
// app.delete("/player/purge", PlayerController.purgeDb);

app.post("/asset", AssetController.post);

//#endregion

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});