const net = require("net");
const fs = require('fs');

const server = net.createServer();

const waitForClient = (client) => {
  client.on("data", (path) => {
    fs.readFile(`./search/${JSON.parse(path)}`, 'utf8', function(err, data) {
      client.write(`${JSON.parse(path)}: ` + data);
    });

  });

};

server.on("connection", (client) => {
  console.log("New client connected!");
  waitForClient(client);
});

server.listen(3000, () => {
  console.log("Server listening on port 3000!");
});