// importar a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose();

//iciar o objeto de banco de dados
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;
//usar objeto db para as minhas aplicações
db.serialize(() => {
  //criar uma tabela com comandos sql
  //   db.run(`
  //     CREATE TABLE IF NOT EXISTS places (
  //       id INTEGER PRIMARY KEY AUTOINCREMENT,
  //       image TEXT,
  //       name TEXT,
  //       adress TEXT,
  //       adress2 TEXT,
  //       state TEXT,
  //       city TEXT,
  //       items TEXT
  //     );
  //   `);
  //   //inserir dados na tabela
  //   const query = `
  //     INSERT INTO places (
  //       image,
  //       name,
  //       adress,
  //       adress2,
  //       state,
  //       city,
  //       items
  //     ) VALUES (?,?,?,?,?,?,?);
  //   `;
  //   const values = [
  //     "https://images.pexels.com/photos/1555199/pexels-photo-1555199.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  //     "Papersider",
  //     "R. Paulo André Gesser,",
  //     "Nº 1797",
  //     "SC",
  //     "Braço do Norte",
  //     "Paper, Cardboard",
  //   ];

  //   function afterInsertData(err) {
  //     if (err) {
  //       return console.log(err);
  //     } else {
  //       console.log("registered successfully");
  //       console.log(this);
  //     }
  //   }

  //   db.run(query, values, afterInsertData);
  // consultar dados da tabela *************
  // db.all(`SELECT * FROM places`, function(err, rows){
  //   if (err) {
  //     return console.log(err);
  //   }

  //   console.log("here is your registers: ")
  //   console.log(rows)
  // })

  // excluir dados ************
  db.run(`DELETE FROM places WHERE id= ?`, [1], function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Register succefuly deleted");
  });
});
