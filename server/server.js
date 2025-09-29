// Server initialised at port 3000/
// Import the root directory for the server.

const http = require("http");
const app = require("./index");

const port = 3306;
const server = http.createServer(app);

server.listen(port);
