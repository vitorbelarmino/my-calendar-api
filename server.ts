import { App } from "./App";

const apiPort = process.env.API_PORT || 3333;
const app = new App();
app.start(apiPort);
