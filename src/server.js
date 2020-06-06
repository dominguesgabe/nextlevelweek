const express = require("express");
const server = express();

//config pasta pública
server.use(express.static("public"));

//utilizando tmplate engines
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

//configurar caminhos
// home
// req: requisisção
//res: resposta
server.get("/", (req, res) => {
  return res.render("index.html");
});
server.get("/create-point", (req, res) => {
  return res.render("create-point.html");
});
server.get("/search", (req, res) => {
  return res.render("search-results.html");
});

//ligar o server
server.listen(3000);
