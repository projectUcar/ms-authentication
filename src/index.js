import app from "./app";
import { PORT } from "./config.js";
import './database'
import "./libs/initialSetup.js";

app.listen(PORT);
console.log('Server listening on port', PORT);
