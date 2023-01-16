module.exports = class Trabalho {
    constructor() {
        this.titulo = "";
        this.resumo = ""; 
        this.palavras_chave = ""; 
        this.link = ""; 
        this.autor_id = ""; 
        this.orientador_id = ""; 
    }
// ------------------------ 
    setTitulo(tit) {
        this.titulo = tit;
    }
    getTitulo() {
        return this.titulo;
    }
// ------------------------   
    setResumo(res) {
        this.resumo = res;
    }
    getResumo() {
        return this.resumo;
    }
// ------------------------ 
    setPalavrasChave(pc) {
        this.palavras_chave = pc;
    }
    getPalavrasChave() {
        return this.palavras_chave;
    }
// ------------------------ 
    setLink(l) {
        this.link = l;
    }
    getLink() {
        return this.link;
    }
// ------------------------ 
    setAutorId(aut) {
        this.autor_id = aut;
    }
    getAutorId() {
        return this.autor_id ;
    }
// ------------------------ 
    setOrientadorId(oid){
      this.orientador_id = oid;
    }
    getOrientadorId(){
      return this.orientador_id;
    }
// ------------------------ TEMPLATE DE SET E GET

    // set() {
    //     this. = ;
    // }
    // get() {
    //     return this. ;
    // }

// ------------------------ CONEXAO DO BANCO

inserir(connection) {
	  
    var sql = "INSERT INTO trabalhos (titulo, resumo, palavras_chave, link, autor_id, orientador_id) VALUES (?, ?, ?, ?, ?, ?)";

    connection.query(sql, [this.titulo, this.resumo, this.palavras_chave, this.link, this.autor_id, this.orientador_id], function (err, result) {
      if (err) throw err;
      });
  }

  listar(connection, callback) {
    var sql = "SELECT * FROM trabalhos";

    connection.query(sql, function (err, result) {
		if (err) throw err;
		return callback(result);
    });    
  }

  pesquisar(connection, callback) {
    var sql = "SELECT * FROM trabalhos WHERE id like ?";

    connection.query(sql, [this.titulo], function (err, result) {
		if (err) throw err;
		return callback(result);
    });    
  }

  deletar(connection) {
	var sql = "DELETE FROM trabalhos WHERE titulo =  ?";

	connection.query(sql, [this.titulo], function (err, result) {
	  if (err) throw "teste";
	  //if (err) console.error('err from callback: ' + err.stack);
    });
  }

  consultarChave(connection, callback) {
    var sql = "SELECT * FROM trabalhos WHERE titulo = ?";

    connection.query(sql, [this.titulo], function (err, result) {
		if (err) throw err;
		return callback(result);
    });    
  }
  
  atualizar(connection) {
	try {
		var sql = "UPDATE trabalhos SET resumo = ?, palavras_chave = ?, link = ?, autor_id = ?, orientador_id = ?  WHERE titulo = ?";

		connection.query(sql, [this.resumo, this.palavras_chave, this.link, this.autor_id, this.orientador_id], function (err, result) {
		  //if (err) throw "teste";
		  if (err) console.error('err from callback: ' + err.stack);
		  });
	} catch (e) {
		console.error('err from callback: ' + e.stack);
		throw e;
	}
  }  
}