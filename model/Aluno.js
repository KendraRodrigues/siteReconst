module.exports = class Aluno {
    constructor() {
        this.matricula = 0;
        this.senha = ""; 
        this.nome = ""; 
        this.telefone = ""; 
        this.email = ""; 
        this.curso_id = ""; 
        this.professor_id = ""; 
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
    setProfessorId(pid){
      this.professor_id = pid;
    }
    getProfessorId(){
      return this.pid;
    }
// ------------------------ 
    setCursoId(cid){
      this.curso_id = cid;
    }
    getCursoId(){
      return this.cid;
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
	  
    var sql = "INSERT INTO alunos (matricula, senha, nome, telefone, email, curso_id, professor_id) VALUES (?, ?, ?, ?, ?, ?, ?)";

    connection.query(sql, [this.matricula, this.senha, this.nome, this.telefone, this.email, this.curso_id, this.professor_id], function (err, result) {
      if (err) throw err;
      });
  }

  listar(connection, callback) {
    var sql = "SELECT * FROM alunos";

    connection.query(sql, function (err, result) {
		if (err) throw err;
		return callback(result);
    });    
  }

  pesquisar(connection, callback) {
    var sql = "SELECT * FROM alunos WHERE nome like ?";

    connection.query(sql, [this.nome], function (err, result) {
		if (err) throw err;
		return callback(result);
    });    
  }

  deletar(connection) {
	var sql = "DELETE FROM alunos WHERE matricula =  ?";

	connection.query(sql, [this.matricula], function (err, result) {
	  if (err) throw "teste";
	  //if (err) console.error('err from callback: ' + err.stack);
    });
  }

  consultarChave(connection, callback) {
    var sql = "SELECT * FROM alunos WHERE matricula = ?";

    connection.query(sql, [this.matricula], function (err, result) {
		if (err) throw err;
		return callback(result);
    });    
  }
  
  atualizar(connection) {
	try {
		var sql = "UPDATE alunos SET senha = ?, nome = ?, telefone = ?, email = ?, curso_id = ?, professor_id = ? WHERE matricula = ?";

		connection.query(sql, [this.senha, this.nome, this.telefone, this.email, this.curso_id, this.professor_id, this.matricula], function (err, result) {
		  //if (err) throw "teste";
		  if (err) console.error('err from callback: ' + err.stack);
		  });
	} catch (e) {
		console.error('err from callback: ' + e.stack);
		throw e;
	}
  }  
}