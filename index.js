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
    m.setNome(req.body.nome);

    var retorno = m.inserir(con);
    console.log('Aqui: '+retorno);
  }catch (e) {
    console.log('Erro '+e.message);
  }

  res.render('modalidade/resultado.ejs', {param: m, msg: 'Modalidade registrada com sucesso!!!'});
})

app.post('/excluirModalidade', function(req, res){
	var m = new Modalidade();
	m.setNome(req.body.nome);
	m.deletar(con);
	res.render('modalidade/resultado.ejs', {param: m, msg: 'Modalidade deletada com sucesso!!!'});
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