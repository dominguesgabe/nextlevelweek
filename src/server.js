const express = require("express");
const server = express();

//pegar o banco de dados
const db = require("./database/db.js");

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
  //pegar os dados do banco
  db.all(`SELECT * FROM places`, function (err, rows) {
    if (err) {
      return console.log(err);
    }
    const total = rows.length;
    //mostrar a página html com os dados do db
    return res.render("search-results.html", { places: rows, total: total });
  });
});

//ligar o server
server.listen(3000);
