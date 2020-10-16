const app         = require('express')();
const http        = require('http');
const cors        = require('cors');
const bodyParser  = require('body-parser');
require("dotenv").config();

const api = require('./app/routes/routes');
const socket = require('./app/socket');

const server = http.createServer(app);

app.use(cors());
// parse request of content-type: application/json
app.use(bodyParser.json());
// parse request of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

api(app);
socket(server);

port = process.env.PORT || 5000;
server.listen(port, process.env.HOST, () => {
  console.log(`API started on: ${ port }`);
});