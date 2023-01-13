const express = require('express');
const app = express();                 

app.use(express.static(__dirname + '/views'));

app.listen(3000, function(){
  console.log("Servidor no ar - Porta: 3000!")
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

const Professor = require('./model/Professor');

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

app.get('/professores', function(req, res){
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