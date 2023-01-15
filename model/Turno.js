module.exports = class Turno {
    constructor() {
        this.id = 0;
        this.nome = "";
    }

    setId(i) {
        this.id = i;
    }
    getId() {
        return this.id;
    }

    setNome(n) {
        this.nome = n;
    }
    getNome() {
        return this.nome;
    }

// ------------------------ CONEXAO DO BANCO

    inserir(connection) {
	  
        var sql = "INSERT INTO turnos (nome) VALUES (?)";
    
        connection.query(sql, [this.nome], function (err, result) {
          if (err) throw err;
          });
      }
    

      listar(connection, callback) {
        var sql = "SELECT * FROM turnos";

        connection.query(sql, function (err, result) {
            if (err) throw err;
            return callback(result);
        });    
    }

    pesquisar(connection, callback){
        var sql = "SELECT * FROM turnos WHERE nome like ?";

        connection.query(sql, [this.nome], function (err, result) {
            if (err) throw err;
            return callback(result);
        });   
    }

    deletar(connection) {
        var sql = "DELETE FROM turnos WHERE nome =  ?";

        connection.query(sql, [this.nome], function (err, result) {
        if (err) throw "teste";
        //if (err) console.error('err from callback: ' + err.stack);
        });
    }

}