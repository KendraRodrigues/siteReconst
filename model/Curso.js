const Modalidade = require('./Modalidade');
const Turno = require('./Turno');
module.exports = class Curso {
    constructor() {
        this.nome = "";
        this.quantidade_periodo = 0;
        this.tipo_periodo = "";
        this.modalidade_id = new Modalidade();
        this.turno_id = new Turno();
    }

// ------------------------ 
    // set() {
    //     this. = ;
    // }
    // get() {
    //     return this. ;
    // }
// ------------------------ 
    setNome(n) {
        this.nome = n;
    }
    getNome() {
        return this.nome;
    }
// ------------------------ 
    setQuantosPeriodos(qp) {
        this.quantidade_periodo = qp;
    }
    getQuantosPeriodos() {
        return this.quantidade_periodo;
    }
// ------------------------ 
    setTipoPeriodo(tp) {
        this.tipo_periodo = tp;
    }
    getTipoPeriodo() {
        return this.tipo_periodo;
    }
// ------------------------ 
    setModalidadeId(mi) {
        this.modalidade_id = mi;
    }
    getModalidadeId() {
        return this.modalidade_id;
    }
// ------------------------ 
    setTurnoId(ti) {
        this.turno_id = ti;
    }
    getTurnoId() {
        return this.turno_id;
    }

// ------------------------ CONEXAO DO BANCO

inserir(connection) {
        
    var sql = "INSERT INTO cursos (nome, quantidade_periodo, tipo_periodo, modalidade_id, turno_id) VALUES (?, ?, ?, ?, ?)";

    connection.query(sql, [this.nome, this.quantidade_periodo, this.tipo_periodo, this.modalidade_id.getId(), this.turno_id.getId()], function (err, result) {
  if (err) throw err;
  });
}

    listar(connection, callback) {
        var sql = "SELECT * FROM cursos";

        connection.query(sql, function (err, result) {
            if (err) throw err;
            return callback(result);
        });    
    }

    pesquisar(connection, callback) {
        var sql = "SELECT * FROM cursos WHERE nome like ?";

        connection.query(sql, [this.nome], function (err, result) {
            if (err) throw err;
            return callback(result);
        });    
    }

    deletar(connection) {
        var sql = "DELETE FROM cursos WHERE nome =  ?";

        connection.query(sql, [this.nome], function (err, result) {
        if (err) throw "teste";
        //if (err) console.error('err from callback: ' + err.stack);
        });
    }

    consultarChave(connection, callback) {
        var sql = "SELECT * FROM cursos WHERE nome = ?";
    
        connection.query(sql, [this.nome], function (err, result) {
            if (err) throw err;
            return callback(result);
        });    
      }

      atualizar(connection) {
        try {
            var sql = "UPDATE cursos SET, quantidade_periodo = ?, tipo_periodo = ?, modalidade_id = ?, turno_id = ? WHERE nome = ?";
    
            connection.query(sql, [this.quantidade_periodo, this.tipo_periodo, this.modalidade_id, this.turno_id, this.nome], function (err, result) {
              //if (err) throw "teste";
              if (err) console.error('err from callback: ' + err.stack);
              });
        } catch (e) {
            console.error('err from callback: ' + e.stack);
            throw e;
        }
      }

}