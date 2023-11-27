import app from "./app";
import './database'
import "./libs/initialSetup.js";

app.listen(4000);
console.log('Server listening on port', 4000);
app.set("json spaces", 4);