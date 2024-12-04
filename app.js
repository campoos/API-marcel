//Import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Inicializando a utilização do express através da váriavel app
const app = express()

//request - Significa a chegada de dados na API
//response - Significa a saída de dados da API
app.use((request, response, next)=>{
    //Permissão de acesso para quem irá chamar a API
    response.header('Acess-Control-Allow-Origin', '*')
    //Permissão de acesso para quais métodos a API irá responder
    response.header('Acess-Control-Allow-Methods', 'GET')

    //Ativa as configurações do header para o cors()
    app.use(cors())


    next()
})

 //Import do arquivo funções
let AlunosCursos = require('./modulo/funcoes')

//Endpoint para retornar uma lista com todos os cursos
app.get('/v1/lion-school/cursos', cors(), async function(request, response){
    
    //Chama a função que retorna todos os estados
    let dados = AlunosCursos.getListaDeCursos()

    //Resposta da API com o JSON e o status code
    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi possível encontrar a lista de cursos'})
    }
})

//Endpoint para retornar uma lista com todos os alunos
app.get('/v1/lion-school/alunos', cors(), async function(request, response){
    
    //Chama a função que retorna todos os estados
    let dados = AlunosCursos.getListaDeAlunos()

    //Resposta da API com o JSON e o status code
    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi possível encontrar a lista de alunos'})
    }
})

//Endpoint para retornar uma lista com todos os alunos a partir de um paramêtro especifico: 
// - Status
// - Curso + Status
// - Curso + Ano de conclusão
app.get('/v1/lion-school/alunos/filtro', cors(), async function(request, response){
    const status = request.query.status
    const curso = request.query.curso
    const ano_conclusao = request.query['ano_conclusao']


    let resultado = []

    if (curso && status) {
        // Filtra os alunos por curso e status 
        resultado = AlunosCursos.getListarStatusDisciplina(curso, status)
    } else if (curso && ano_conclusao) {
        // Filtra os alunos por curso e ano de conclusão
        resultado = AlunosCursos.getListarPorCursoEConclusao(curso, ano_conclusao)
    } else if (status) {
        // Filtra os alunos com base no status
        resultado = AlunosCursos.getAlunosStatusEspecificado(status) 
    } else {
        // Se nenhum parâmetro for fornecido
        response.status(404).json({
            message: 'Parâmetros inválidos. Por favor, especifique ao menos um filtro.',
        })
        return
    }

    if(resultado){
        response.status(200)
        response.json(resultado)
    }else {
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado nenhum resultado para retorno.'})
    }   
})

//Endpoint para retornar uma lista com as informações de um aluno com base na matricula
app.get('/v1/lion-school/alunos/:matricula', cors(), async function(request, response){

    let numMatricula = request.params.matricula
    
    //Chama a função que retorna todos os estados
    let dados = AlunosCursos.getInformacoesAluno(numMatricula)

    //Resposta da API com o JSON e o status code
    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi possível encontrar tal aluno/informações do mesmo'})
    }
})

//Endpoint para retornar uma lista com todos os alunos de um curso especificado
app.get('/v1/lion-school/alunos/cursos/:curso', cors(), async function(request, response){

    let siglaCurso = request.params.curso
    
    //Chama a função que retorna todos os estados
    let dados = AlunosCursos.getAlunosCursoEspecificado(siglaCurso)

    //Resposta da API com o JSON e o status code
    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi possível encontrar a lista de alunos do curso especificado'})
    }
})

//Executa a API e faz com que fique aguardando novas requisições
app.listen('8080', function(){
    console.log('API funcionando e aguardando requisições...')
})  

