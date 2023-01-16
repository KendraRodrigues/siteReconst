const express = require('express');
const app = express();                 

app.use(express.static(__dirname + '/views'));

app.listen(3000, function(){
  console.log("Servidor no ar - Porta: 3000!")
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

const Professor = require('./model/Professor');
const Modalidade = require('./model/Modalidade');
const Turno = require('./model/Turno');
const Curso = require('./model/Curso');
const Aluno = require('./model/Aluno');
const Trabalho = require('./model/Trabalho');

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "grupo",
  password: "12345678",
  database: "skefesa"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Banco de dados conectado!");
});

app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/index.html');
});

/* Funções de Professores */
app.get('/professores', function(req, res){

  var p = new Professor();
  p.listar(con, function(result){
    res.render('professor/lista.ejs', {professores: result});
  })

});

app.post('/filtrarProfessor', function(req, res){
	var p = new Professor();
	p.setNome(req.body.nome);
	
	if (p.getNome() == '') {
    p.setNome('%');
	}
	
	p.pesquisar(con, function(result){
		res.render('professor/lista.ejs', {professores: result});
	});
});

app.get('/formProfessor', function(req, res){
	res.sendFile(__dirname + '/views/professor/form.html');
});

app.post('/salvarProfessor', function(req, res){
  
  try {
    var p = new Professor();
    p.setMatricula(req.body.matricula);
    p.setSenha(req.body.senha);
    p.setNome(req.body.nome);
    p.setTelefone(req.body.telefone);
    p.setEmail(req.body.e_mail);
    // Inserir titulações
    
    var retorno = p.inserir(con);
      console.log('Aqui: ' + retorno);
  } catch (e) {
      console.log('Erro: '+e.message);
  }
	
	res.render('professor/resultado.ejs', {param: p, msg: 'Professor registrado com sucesso!!!'});
});

// app.post('/excluirProfessor', function(req, res){
// 	var p = new Professor();
// 	p.setMatricula(req.body.matricula);
// 	p.deletar(con);
// 	res.render('professor/resultado.ejs', {param: p, msg: 'Professor deletado com sucesso!!!'});
// });

app.post('/gerenciarProfessor', function(req, res){
	var p = new Professor();
	if (req.body.acao == 'Excluir') {
		p.setMatricula(req.body.matricula);
	  p.deletar(con);
		res.render('professor/resultado.ejs', {param: p, msg: 'Professor deletado com sucesso!!!'});
	} else {
		p.setMatricula(req.body.matricula);
		p.consultarChave(con, function(result){
			res.render('professor/form.ejs', {professores: result});
		});
	}	
});

app.post('/atualizarProfessor', function(req, res){
  try {
    
    var p = new Professor();
    
    p.setMatricula(req.body.matricula);
    p.setSenha(req.body.senha);
    p.setNome(req.body.nome);
    p.setTelefone(req.body.telefone);
    p.setEmail(req.body.e_mail);
		
		var retorno = p.atualizar(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
    console.log('Erro: '+e.message);
	}
	res.render('professor/resultado.ejs', {param: p, msg: 'Professor atualizado com sucesso!!!'});
});

/* Funções de Modalidades */

app.get('/modalidades', function(req, res){

  var m = new Modalidade();
  m.listar(con, function(result){
    res.render('modalidade/lista.ejs', {modalidades: result});
  })

});

app.post('/filtrarModalidade', function(req, res){
	var m = new Modalidade();
	m.setNome(req.body.nome);
	
	if (m.getNome() == '') {
    m.setNome('%');
	}
	
	m.pesquisar(con, function(result){
		res.render('modalidade/lista.ejs', {modalidades: result});
	});
});

app.get('/formModalidade', function(req, res){
	res.sendFile(__dirname + '/views/modalidade/form.html');
});

app.post('/salvarModalidade', function(req, res){

  try {
    var m = new Modalidade();
    m.setId(req.body.id);
    m.setNome(req.body.nome);

    var retorno = m.inserir(con);
    console.log('Aqui: '+retorno);
  }catch (e) {
    console.log('Erro '+e.message);
  }

  res.render('modalidade/resultado.ejs', {param: m, msg: 'Modalidade registrada com sucesso!!!'});
})

// app.post('/excluirModalidade', function(req, res){
// 	var m = new Modalidade();
// 	m.setNome(req.body.nome);
// 	m.deletar(con);
// 	res.render('modalidade/resultado.ejs', {param: m, msg: 'Modalidade deletada com sucesso!!!'});
// });

app.post('/gerenciarModalidade', function(req, res){
	var m = new Modalidade();
	if (req.body.acao == 'Excluir') {
		m.setNome(req.body.nome);
	  m.deletar(con);
		res.render('modalidade/resultado.ejs', {param: m, msg: 'Modalidade deletada com sucesso!!!'});
	} else {
		m.setNome(req.body.nome);
		m.consultarChave(con, function(result){
			res.render('modalidade/form.ejs', {modalidades: result});
		});
	}	
});

app.post('/atualizarModalidade', function(req, res){
  try {
    
    var m = new Modalidade();
    
    m.setNome(req.body.nome);
    // m.setId();
		
		var retorno = m.atualizar(con);
		console.log('Olá: ' + retorno);
	} catch (e) {
    console.log('Erro: '+e.message);
	}
	res.render('modalidade/resultado.ejs', {param: m, msg: 'Modalidade atualizada com sucesso!!!'});
});

/* Funções de Turno */

app.get('/turnos', function(req, res){

  var t = new Turno();
  t.listar(con, function(result){
    res.render('turno/lista.ejs', {turnos: result});
  })

});

app.post('/filtrarTurno', function(req, res){
	var t = new Turno();
	t.setNome(req.body.nome);
	
	if (t.getNome() == '') {
    t.setNome('%');
	}
	
	t.pesquisar(con, function(result){
		res.render('turno/lista.ejs', {turnos: result});
	});
});

app.get('/formTurno', function(req, res){
	res.sendFile(__dirname + '/views/turno/form.html');
});

app.post('/salvarTurno', function(req, res){

  try {
    var t = new Turno();
    t.setNome(req.body.nome);

    var retorno = t.inserir(con);
    console.log('Aqui: '+retorno);
  }catch (e) {
    console.log('Erro '+e.message);
  }

  res.render('turno/resultado.ejs', {param: t, msg: 'Turno registrado com sucesso!!!'});
})

app.post('/excluirTurno', function(req, res){
	var t = new Turno();
	t.setNome(req.body.nome);
	t.deletar(con);
	res.render('turno/resultado.ejs', {param: t, msg: 'Turno deletado com sucesso!!!'});
});


/* Funções de Curso */

app.get('/cursos', function(req, res){

  var c = new Curso();
  c.listar(con, function(result){
    res.render('curso/lista.ejs', {cursos: result});
  })

});

app.post('/filtrarCurso', function(req, res){
	var c = new Curso();
	c.setNome(req.body.nome);
	
	if (c.getNome() == '') {
    c.setNome('%');
	}
	
	c.pesquisar(con, function(result){
		res.render('curso/lista.ejs', {cursos: result});
	});
});

app.get('/formCurso', function(req, res){
	res.sendFile(__dirname + '/views/curso/form.html');
});

// app.get('/formCurso', function(req, res){
// 	var c = new Curso();  
//     // var s = new Servico(); 
    
// 	c.listar(con, function(result1){
// 		// s.listar(con, function(result2){
// 			res.render('curso/form.ejs', {cursos: result1});
// 		// });
// 	});
	
	
// });


app.post('/salvarCurso', function(req, res){
  
  try {
    var c = new Curso();
    c.setNome(req.body.nome);
    c.setQuantosPeriodos(req.body.quantidade_periodo);
    c.setTipoPeriodo(req.body.tipo_periodo);
    c.getModalidadeId().setId(req.body.id);
    c.getTurnoId().setId(req.body.id);
    
    var retorno = c.inserir(con);
      console.log('Aqui: ' + retorno);
  } catch (e) {
      console.log('Erro: '+e.message);
  }
	
	res.render('curso/resultado.ejs', {param: c, msg: 'Curso registrado com sucesso!!!'});
});

app.post('/gerenciarCurso', function(req, res){
	var c = new Curso();
	if (req.body.acao == 'Excluir') {
		c.setNome(req.body.nome);
	  c.deletar(con);
		res.render('curso/resultado.ejs', {param: c, msg: 'Curso deletado com sucesso!!!'});
	} else {
		c.setNome(req.body.nome);
		c.consultarChave(con, function(result){
			res.render('curso/form.ejs', {cursos: result});
		});
	}	
});

app.post('/atualizarCurso', function(req, res){
  try {
    
    var c = new Curso();
    
    c.setMatricula(req.body.nome);
    c.setQuantosPeriodos(req.body.quantidade_periodo);
    c.setTipoPeriodo(req.body.tipo_periodo);
    c.getModalidadeId().setId(req.body.id);
    c.getTurnoId().setId(req.body.id);
		
		var retorno = c.atualizar(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
    console.log('Erro: '+e.message);
	}
	res.render('professor/resultado.ejs', {param: c, msg: 'Professor atualizado com sucesso!!!'});
});

/* Funções de Alunos */

app.get('/alunos', function(req, res){

  var a = new Aluno();
  a.listar(con, function(result){
    res.render('aluno/lista.ejs', {alunos: result});
  })

});

app.post('/filtrarAluno', function(req, res){
	var a = new Aluno();
	a.setNome(req.body.nome);
	
	if (a.getNome() == '') {
    a.setNome('%');
	}
	
	a.pesquisar(con, function(result){
		res.render('aluno/lista.ejs', {alunos: result});
	});
});

app.get('/formAluno', function(req, res){
	res.sendFile(__dirname + '/views/aluno/form.html');
});

app.post('/salvarAluno', function(req, res){
  
  try {
    var a = new Aluno();

    a.setMatricula(req.body.matricula);
    a.setSenha(req.body.senha);
    a.setNome(req.body.nome);
    a.setTelefone(req.body.telefone);
    a.setEmail(req.body.email);
    a.setCursoId(req.body.curso_id);
    a.setProfessorId(req.body.professor_id);
    
    var retorno = a.inserir(con);
      console.log('Aqui: ' + retorno);
  } catch (e) {
      console.log('Erro: '+e.message);
  }
	
	res.render('aluno/resultado.ejs', {param: a, msg: 'Aluno registrado com sucesso!!!'});
});

app.post('/gerenciarAluno', function(req, res){
	var a = new Aluno();
	if (req.body.acao == 'Excluir') {
		a.setMatricula(req.body.matricula);
	  a.deletar(con);
		res.render('aluno/resultado.ejs', {param: a, msg: 'Aluno deletado com sucesso!!!'});
	} else {
		a.setMatricula(req.body.matricula);
		a.consultarChave(con, function(result){
			res.render('aluno/form.ejs', {alunos: result});
		});
	}	
});

app.post('/atualizarAluno', function(req, res){
  try {
    
    var a = new Aluno();
    
    a.setMatricula(req.body.matricula);
    a.setSenha(req.body.senha);
    a.setNome(req.body.nome);
    a.setTelefone(req.body.telefone);
    a.setEmail(req.body.email);
    a.setCursoId(req.body.curso_id);
    a.setProfessorId(req.body.professor_id);
		
		var retorno = a.atualizar(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
    console.log('Erro: '+e.message);
	}
	res.render('aluno/resultado.ejs', {param: a, msg: 'Aluno atualizado com sucesso!!!'});
});

/* Funções de Trabalhos */

app.get('/trabalhos', function(req, res){

  var t = new Trabalho();
  t.listar(con, function(result){
    res.render('trabalho/lista.ejs', {trabalhos: result});
  })

});

app.post('/filtrarTrabalho', function(req, res){
	var t = new Trabalho();
	t.setTitulo(req.body.titulo);
	
	if (t.getTitulo() == '') {
    t.setTitulo('%');
	}
	
	t.pesquisar(con, function(result){
		res.render('trabalho/lista.ejs', {trabalhos: result});
	});
});

app.get('/formTrabalho', function(req, res){
	res.sendFile(__dirname + '/views/trabalho/form.html');
});

app.post('/salvarTrabalho', function(req, res){
  
  try {
    var t = new Trabalho();

    t.setTitulo(req.body.titulo);
    t.setResumo(req.body.resumo);
    t.setPalavrasChave(req.body.palavras_chave);
    t.setLink(req.body.link);
    t.setAutorId(req.body.autor_id);
    t.setOrientadorId(req.body.orientador_id);
    
    var retorno = t.inserir(con);
      console.log('Aqui: ' + retorno);
  } catch (e) {
      console.log('Erro: '+e.message);
  }
	
	res.render('trabalho/resultado.ejs', {param: t, msg: 'Trabalho registrado com sucesso!!!'});
});

app.post('/gerenciarTrabalho', function(req, res){
	var t = new Trabalho();
	if (req.body.acao == 'Excluir') {
		t.setTitulo(req.body.titulo);
	  t.deletar(con);
		res.render('trabalho/resultado.ejs', {param: t, msg: 'Trabalho deletado com sucesso!!!'});
	} else {
		t.setTitulo(req.body.titulo);
		t.consultarChave(con, function(result){
			res.render('trabalho/form.ejs', {trabalhos: result});
		});
	}	
});

app.post('/atualizarTrabalho', function(req, res){
  try {
    
    var t = new Trabalho();
    
    t.setTitulo(req.body.titulo);
    t.setResumo(req.body.resumo);
    t.setPalavrasChave(req.body.palavras_chave);
    t.setLink(req.body.link);
    t.setAutorId(req.body.autor_id);
    t.setOrientadorId(req.body.orientador_id);
		
		var retorno = t.atualizar(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
    console.log('Erro: '+e.message);
	}
	res.render('trabalho/resultado.ejs', {param: t, msg: 'Trabalho atualizado com sucesso!!!'});
});