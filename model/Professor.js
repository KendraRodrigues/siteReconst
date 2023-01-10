module.exports = class Professor {
    constructor() {
        this.matrícula = 0;
        this.senha = ""; 
        this.nome = ""; 
        this.telefone = ""; 
        this.e_mail = ""; 
        this.titulações = ""; 
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
    setTitulacoes(tit) {
        this.titulações = tit;
    }
    getTitulacoes() {
        return this.titulações;
    }

    // set() {
    //     this. = ;
    // }
    // get() {
    //     return this. ;
    // }

// ------------------------ CONEXAO DO BANCO

    
}
