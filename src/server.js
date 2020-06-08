const express = require("express");
const server = express();

//pegar o banco de dados
const db = require("./database/db.js");

//config pasta pública
server.use(express.static("public"));

//habilitar o uso da req.body
server.use(express.urlencoded({ extended: true }));

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
  //req.query = query strings

  return res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {
  //req.body == o corpo do nosso formulário
  // console.log(req.body);

  //injetar input no db

  //inserir dados na tabela
  const query = `
    INSERT INTO places (
      image,
      name,
      adress,
      adress2,
      state,
      city,
      items
    ) VALUES (?,?,?,?,?,?,?);
  `;
  const values = [
    req.body.image,
    req.body.name,
    req.body.adress,
    req.body.adress2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];

  function afterInsertData(err) {
    if (err) {
      console.log(err);
      return res.send("REGISTER ERROR");
    } else {
      console.log("registered successfully");
      console.log(this);

      return res.render("create-point.html", { sved: true });
    }
  }

  db.run(query, values, afterInsertData);
});

server.get("/search", (req, res) => {
  const search = req.query.search;

  if (search == "") {
    //pesquisa vazia
    return res.render("search-results.html", { total: 0 });
  }

  //pegar os dados do banco
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (
    err,
    rows
  ) {
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
