import express from "express";
import cors from "cors";
import GlobalError from "./src/middlewares/GlobalError";
import { routes } from "./src/routes";

export class App {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.app.use(
      cors({
        origin: true,
        credentials: true,
      }),
    );
    this.app.use(express.json());
    this.app.use("/", routes);
    this.app.use(GlobalError.handleError);
  }

  public start(port: number | string): void {
    this.app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }
}
