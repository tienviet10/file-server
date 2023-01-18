const net = require("net");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const conn = net.createConnection({
  host: "localhost",
  port: 3000,
});

conn.setEncoding("utf8");

const fileQueries = () => {
  rl.question('File name (exit -> press q): ', (answer) => {
    if (answer === "q") {
      rl.close();
      process.exit();
    }
    conn.write(JSON.stringify(answer));
  });

};

conn.on("connect", () => {
  fileQueries();
});

conn.on("data", (data) => {
  console.log(data);
  fileQueries();
});
