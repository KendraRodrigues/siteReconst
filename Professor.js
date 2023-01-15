module.exports = class Professor {
    constructor() {
        this.matricula = 0;
        this.senha = ""; 
        this.nome = ""; 
        this.telefone = ""; 
        this.e_mail = ""; 
        // this.titulações = ""; 
    }

// ------------------------ 
    setMatricula(mat) {
        this.matricula = mat;
    }
    getMatricula() {
        return this.matricula;
    }
// ------------------------   
    setSenha(sen) {
        this.senha = sen;
    }
    getSenha() {
        return this.senha;
    }
// ------------------------ 
    setNome(n) {
        this.nome = n;
    }
    getNome() {
        return this.nome;
    }
// ------------------------ 
    setTelefone(tel) {
        this.telefone = tel;
    }
    getTelefone() {
        return this.telefone;
    }
// ------------------------ 
    setEmail(em) {
        this.e_mail = em;
    }
    getEmail() {
        return this.e_mail ;
    }
// ------------------------ 
    // setTitulacoes(tit) {
    //     this.titulações = tit;
    // }
    // getTitulacoes() {
    //     return this.titulações;
    // }

// ------------------------ TEMPLATE DE SET E GET

    // set() {
    //     this. = ;
    // }
    // get() {
    //     return this. ;
    // }

// ------------------------ CONEXAO DO BANCO

inserir(connection) {
	  
    var sql = "INSERT INTO professores (matricula, senha, nome, telefone, e_mail) VALUES (?, ?, ?, ?, ?)";

    connection.query(sql, [this.matricula, this.senha, this.nome, this.telefone, this.e_mail], function (err, result) {
      if (err) throw err;
      });
  }

  listar(connection, callback) {
    var sql = "SELECT * FROM professores";

    connection.query(sql, function (err, result) {
		if (err) throw err;
		return callback(result);
    });    
  }

  pesquisar(connection, callback) {
    var sql = "SELECT * FROM professores WHERE nome like ?";

    connection.query(sql, [this.nome], function (err, result) {
		if (err) throw err;
		return callback(result);
    });    
  }

  deletar(connection) {
	var sql = "DELETE FROM professores WHERE matricula =  ?";

	connection.query(sql, [this.matricula], function (err, result) {
	  if (err) throw "teste";
	  //if (err) console.error('err from callback: ' + err.stack);
    });
  }

  consultarChave(connection, callback) {
    var sql = "SELECT * FROM professores WHERE matricula = ?";

    connection.query(sql, [this.matricula], function (err, result) {
		if (err) throw err;
		return callback(result);
    });    
  }
  
  atualizar(connection) {
	try {
		var sql = "UPDATE professores SET senha = ?, nome = ?, telefone = ?, e_mail = ? WHERE matricula = ?";

		connection.query(sql, [this.senha, this.nome, this.telefone, this.e_mail, this.matricula], function (err, result) {
		  //if (err) throw "teste";
		  if (err) console.error('err from callback: ' + err.stack);
		  });
	} catch (e) {
		console.error('err from callback: ' + e.stack);
		throw e;
	}
  }

    
}
