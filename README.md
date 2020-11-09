<h1 align="center">
	REST API - Crud de Funcionários<br/>
	<img src="https://raw.githubusercontent.com/freirart/desafio-tecnico-stone-server/master/readme-image.png" width="300" />
</h1>

## Proposta
Desafio técnico proposto pela <a href="https://www.stone.com.br" target="_blank">Stone</a> _- Fintech brasileira de meios de pagamentos que atua no mercado desde 2014 -_
cuja proposta era construir um client Front-End desenvolvido na stack Javascript que interagisse com uma API REST.

A aplicação deste repositório consiste em uma __API REST__ desenvolvida em __NodeJS__ que utiliza dos bancos __Postgres__ - _para armazenar e relacionar registros de funcionários e cargos_- e __MongoDB__ -_para armazenamento de logs e requisições/respostas_.

<a href="https://github.com/freirart/desafio-tecnico-stone-web" target="_blank">Clique aqui</a> para visitar o repositório da aplicação web em React!

## Tecnologias

### Arquitetura da aplicação
* <a href="https://github.com/expressjs/express" target="_blank">ExpressJS</a>
* <a href="https://github.com/sequelize/sequelize" target="_blank">Sequelize</a>

### Bancos de dados
* <a href="https://www.heroku.com/postgres" target="_blank">Heroku Postgres</a>
* <a href="https://www.mongodb.com/" target="_blank">MongoDB</a>

### Logging e armazenamento de logs
* <a href="https://github.com/winstonjs/winston" target="_blank">winston</a>
* <a href="https://github.com/bithavoc/express-winston" target="_blank">express-winston</a>
* <a href="https://github.com/winstonjs/winston-mongodb" target="_blank">winston-mongodb</a>

## Baixando o código fonte
Para obter o código fonte em sua máquina, execute o seguinte comando:

```
$ git clone https://github.com/freirart/desafio-tecnico-stone-server.git
```
> Rodar o projeto localmente é impossível uma vez que se observa e inexistência de variáveis de ambiente que contêm informações sigilosas tais como as URI's de conexão com o Banco de Dados. Alternativas para testar a aplicação são descritas logo abaixo.

## Rotas
O servidor Back-End está hospedado na <a href="www.heroku.com" target="_blank">Heroku<a/>, logo todas as suas rotas podem ser acessadas partindo do link: <br />
`https://employees-server.herokuapp.com/`

### Rotas GET

#### Obter lista de funcionários
Como uma boa prática de performance, a lista de funcionários é __separada em páginas__, onde cada página possui 20 funcionários.

A rota para as páginas da lista segue o seguinte modelo:

`/employee/page/:pageNumber`

Substituindo `:pageNumber` por __0__, a API retornará os __20 primeiros funcionários__ cadastrados no banco.

#### Obter informações de funcionário pelo seu _Id_

`/employee/:employeeId`

Substitua `:employeeId` pelo _Id_ de seu funcionário e _voilà_!

#### Obter lista de cargos

`/cargos`

Devolve a lista de cargos com seus respectivos _Id's_.

#### Obter lista filtrada de funcionários

`/employee?cargoId=<CargoID>&filtroIdade=<FiltroIdade>&nome=<InicioDoNome>`

Nesta rota, pode-se filtrar funcionários pelo _Id_ de seu cargo, pelo filtro de sua idade e/ou pelo início de seu nome.

* A filtragem pelo cargo é baseada em seu _Id_ (obtém-se o _Id_ do cargo pela rota acima).
* O filtro de idade é dado pelos números de 1 a 4 que seguem a relação abaixo:

    1- Funcionários abaixo de 20 anos; <br/>
    2- Funcionários entre 20 e 30 anos; <br/>
    3- Funcionários entre 31 e 40 anos; <br/>
    4- Funcionários acima de 40 anos;
* O filtro pelo nome é _insensitive case_ (indifere maiusculas e minúsculas) e busca por algo que __comece__ com o que foi entrado. Isto é, caso "art" seja o nome procurado, o funcionário de nome "Artur Freire dos Santos" passará pelo filtro.

> OBS:. Os filtros podem ser combinados ou não.

### Rotas POST

#### Cadastrar um cargo

`/cargos`

Cria um cargo no banco de dados que poderá ser utilizado para atrelar funcionários a este.

O corpo da requisição __deve__ conter o campo `nome`, como mostra o JSON abaixo:

```
{
  "nome": "Um cargo novo na empresa!"
}
```

#### Cadastrar um funcionário

`/employee`

Cria um funcionário no banco de dados.

O corpo da requisição __deve__ conter os campos `nome`, `idade` e `cargoId`, como sugere o JSON abaixo:

```
{
  "nome": "Artur Freire dos Santos",
  "idade": 19,
  "cargoId": 1
}
```
### Rotas PUT
#### Atualizar um funcionário

`/employee/edit`

Altera informações do funcionário no banco de dados.

O corpo da requisição __deve__ conter os campos `id`, `nome`, `idade` e `cargoId`, como ilustra o JSON abaixo: 

```
{
	"id": 1,
	"nome": "Artur Freire dos Santos",
	"idade": 19,
	"cargoId": 1
}
```
#### Atualizar um cargo
`/cargos/edit`

Altera informações do cargo no banco de dados.

O corpo da requisição __deve__ conter os campos `id` e `nome`, como ilustra o JSON abaixo:

```
{
	"id": 1,
	"nome": "Desenvolvedor Fullstack"
}
```
### Rotas DELETE
#### Deletar um cargo
`/cargos/delete/:cargoId`

Substitua `:cargoId` pelo _Id_ do cargo que deseja deletar e _voilà_!

#### Deletar um funcionário
`/employee/delete/:employeeId`

Substitua `:employeeId` pelo _Id_ do cargo que deseja deletar e _voilà_!

## Licença
Projeto desenvolvido sob licença do MIT.
