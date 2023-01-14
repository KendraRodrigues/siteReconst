module.exports = class Modalidade {
    constructor() {
        this.nome = "";
    }

    setNome(n) {
        this.nome = n;
    }
    getNome() {
        return this.nome;
    }

// ------------------------ CONEXAO DO BANCO

    inserir(connection) {
	  
        var sql = "INSERT INTO modalidades (nome) VALUES (?)";
    
        connection.query(sql, [this.nome], function (err, result) {
          if (err) throw err;
          });
      }
    

      listar(connection, callback) {
        var sql = "SELECT * FROM modalidades";

        connection.query(sql, function (err, result) {
            if (err) throw err;
            return callback(result);
        });    
    }

    pesquisar(connection, callback){
        var sql = "SELECT * FROM modalidades WHERE nome like ?";

        connection.query(sql, [this.nome], function (err, result) {
            if (err) throw err;
            return callback(result);
        });   
    }

    deletar(connection) {
        var sql = "DELETE FROM modalidades WHERE nome =  ?";

        connection.query(sql, [this.nome], function (err, result) {
        if (err) throw "teste";
        //if (err) console.error('err from callback: ' + err.stack);
        });
    }

}