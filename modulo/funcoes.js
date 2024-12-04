var listaDeAlunos = require('./alunos.js')
var listaDeCursos = require('./cursos.js')

const getListaDeCursos = function(){
    let contador = 0 
    let cursoBusca = listaDeCursos.cursos
    let guardarCursos = []
    let status = false 

    while (contador < cursoBusca.length){
        status = true
        guardarCursos.push(
            {
                Nome: cursoBusca[contador].nome,
                Sigla: cursoBusca[contador].sigla,
                Icone: cursoBusca[contador].icone,
                Carga: cursoBusca[contador].carga
            }
        )

        contador ++
    }

    if (status == true){
        return guardarCursos
    }else {
        return status
    }
}

const getListaDeAlunos = function(){
    let contador = 0 
    let alunoBusca = listaDeAlunos.alunos
    let guardarAlunos = []
    let status = false 

    while (contador < alunoBusca.length){
        status = true
        guardarAlunos.push({
            nome: alunoBusca[contador].nome,
            matricula: alunoBusca[contador].matricula,
            foto: alunoBusca[contador].foto,
            nome: alunoBusca[contador].nome,
            sexo: alunoBusca[contador].sexo,
            curso: alunoBusca[contador].curso
        })

        contador ++
    }

    if (status == true){
        return guardarAlunos
    }else {
        return status
    }
}

const getInformacoesAluno = function(matriculaEscolhida){
    let contador = 0 
    let matriculaBusca = listaDeAlunos.alunos
    let matriculaEscolhidaLocal = matriculaEscolhida
    let status = false 
    let guardarInformacoes = []

    while (contador < matriculaBusca.length){

        if (matriculaEscolhidaLocal == matriculaBusca[contador].matricula){
            status = true

            guardarInformacoes.push({
                nome: matriculaBusca[contador].nome,
                matricula: matriculaBusca[contador].matricula,
                foto: matriculaBusca[contador].foto,
                nome: matriculaBusca[contador].nome,
                sexo: matriculaBusca[contador].sexo,
                curso: matriculaBusca[contador].curso
            })
        }

        contador ++
    }

    if (status == true){
        return guardarInformacoes
    }else {
        return status
    }
}

const getAlunosCursoEspecificado = function(cursoEscolhido){
    let contador = 0 
    let cursoBusca = listaDeAlunos.alunos
    let cursoEscolhidoLocal = cursoEscolhido.toUpperCase()
    let status = false 
    let guardarInformacoes = []

    while (contador < cursoBusca.length){

        if (cursoEscolhidoLocal == cursoBusca[contador].curso[0].sigla){
            status = true

            guardarInformacoes.push({
                nome: cursoBusca[contador].nome,
                matricula: cursoBusca[contador].matricula,
                foto: cursoBusca[contador].foto,
                nome: cursoBusca[contador].nome,
                sexo: cursoBusca[contador].sexo,
                curso: cursoBusca[contador].curso
            })
        }


        contador ++
    }

    if (status == true){
        return {
            curso: cursoEscolhido,
            nomes: guardarInformacoes
        }
    }else {
        return status
    }
}

const getAlunosStatusEspecificado = function(statusEscolhido){
    let contador = 0 
    let statusBusca = listaDeAlunos.alunos
    let statusEscolhidoLocal = statusEscolhido.toUpperCase()
    let status = false 
    let guardarInformacoes = []

    while (contador < statusBusca.length){

        if (statusEscolhidoLocal.toUpperCase() == statusBusca[contador].status.toUpperCase()){
            status = true

            guardarInformacoes.push({
                nome: statusBusca[contador].nome,
                matricula: statusBusca[contador].matricula,
                foto: statusBusca[contador].foto,
                nome: statusBusca[contador].nome,
                sexo: statusBusca[contador].sexo,
                curso: statusBusca[contador].curso
            })
        }


        contador ++
    }

    if (status == true){
        return guardarInformacoes
    }else {
        return status
    }
}

const getListarStatusDisciplina = function(cursoFornecido, statusDisciplinaFornecido) {

    let contador = 0 
    let cursoBusca = listaDeAlunos.alunos

    // Normalizando os parâmetros recebidos para maiúsculas
    let cursoFornecidoLocal = cursoFornecido.toUpperCase()
    let statusDisciplinaFornecidoLocal = statusDisciplinaFornecido.toUpperCase()
    
    let status = false 
    let guardarInformacoes = []

    while (contador < cursoBusca.length) {
        if (cursoFornecidoLocal === cursoBusca[contador].curso[0].sigla.toUpperCase()) {
            status = true
            let disciplinasFiltradas = []
            let contadorDisciplinas = 0

            while (contadorDisciplinas < cursoBusca[contador].curso[0].disciplinas.length) {
                let disciplina = cursoBusca[contador].curso[0].disciplinas[contadorDisciplinas]

                if (disciplina.status.toUpperCase() === statusDisciplinaFornecidoLocal) {
                    disciplinasFiltradas.push(disciplina)
                }
                contadorDisciplinas++ 
            }
            if (disciplinasFiltradas.length > 0) {
                guardarInformacoes.push({
                    nome: cursoBusca[contador].nome,
                    disciplinas: disciplinasFiltradas
                })
            }
        }
        contador++ 
    }

    if (status === true && guardarInformacoes.length > 0) {
        return {
            curso: cursoFornecido,
            status: statusDisciplinaFornecidoLocal, 
            alunos: guardarInformacoes
        }
    } else {
        return false
    }
}

const getListarPorCursoEConclusao = function(cursoFornecido, anoConclusaoFornecido) {

    let contador = 0
    let cursoBusca = listaDeAlunos.alunos

    let cursoFornecidoLocal = cursoFornecido
    let anoConclusaoFornecidoLocal = anoConclusaoFornecido
    
    let status = false
    let guardarInformacoes = []

    while (contador < cursoBusca.length) {

        if (cursoFornecidoLocal.toUpperCase() == cursoBusca[contador].curso[0].sigla.toUpperCase() 
            && anoConclusaoFornecidoLocal.toUpperCase() == cursoBusca[contador].curso[0].conclusao.toUpperCase()) {
            status = true

            guardarInformacoes.push({
                nome: cursoBusca[contador].nome,
                matricula: cursoBusca[contador].matricula,
                foto: cursoBusca[contador].foto,
                nome: cursoBusca[contador].nome,
                sexo: cursoBusca[contador].sexo,
                curso: cursoBusca[contador].curso
            })
        }

        contador++ 
    }

    if (status == true && guardarInformacoes.length > 0) {
        return {
            curso: cursoFornecido,
            anoConclusao: anoConclusaoFornecido,
            alunos: guardarInformacoes
        }
    } else {
        return false
    }
}


console.log(getListarPorCursoEConclusao('ds', '2024'))


module.exports = {
    getListaDeCursos,
    getListaDeAlunos,
    getInformacoesAluno,
    getAlunosCursoEspecificado,
    getAlunosStatusEspecificado,
    getListarStatusDisciplina,
    getListarPorCursoEConclusao
}