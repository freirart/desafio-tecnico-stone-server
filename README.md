# REST API - Crud de Funcionários

## Proposta
Desafio técnico proposto pela <a href="https://www.stone.com.br" target="_blank">Stone</a>: uma Fintech brasileira de meios de pagamentos que atua no mercado desde 2014.

A proposta é construir uma API REST que interaja com uma aplicação Front-End desenvolvida na stack Javascript (escolhi React para fazer).

A aplicação consiste em um CRUD de Funcionários desenvolvida em NodeJS cujas funções são melhores descritas em suas rotas e na aplicação web.

<a href="https://github.com/freirart/desafio-tecnico-stone-web" target="_blank">Clique aqui para visitar o repositório da aplicação web em React!</a>

## Baixando o código fonte

Para obter o código fonte em sua máquina, execute o seguinte comando:

```
$ git clone https://github.com/freirart/desafio-tecnico-stone-server.git
```
> Rodar o projeto localmente é impossível uma vez que se observa e inexistência de variáveis de ambiente que contêm informações sigilosas tais como as URI's de conexão com o Banco de Dados.

## Rotas
O servidor Back-End está hospedado na <a href="www.heroku.com" target="_blank">Heroku<a/>, logo todas as suas rotas podem ser acessadas partindo do link: <br />
`https://employees-server.herokuapp.com/`

### Rotas GET

#### Obter lista de funcionários
Como uma boa prática de performance, a lista de funcionários é __separada em páginas__, onde cada página possui 20 funcionários.

A rota para as páginas da lista seguem o seguinte modelo:

`/employee/page/:pageNumber`

Passando __0__ como o número da página, a API retornará os __20 primeiros funcionários__ cadastrados no banco.

#### Obter informações de funcionário pelo seu _ID_

`/employee/:employeeId`

Substitua `:employeeId` pelo _ID_ de seu funcionário e _voilà_!

#### Obter lista de cargos

`/cargos`

Devolve a lista de cargos com seus respectivos _ID's_.

#### Obter lista filtrada de funcionários

`/employee?cargoId=<CargoID>&filtroIdade=<FiltroIdade>&nome=<InicioDoNome>`

Nesta rota, pode-se filtrar funcionários pelo _ID_ de seu cargo, pelo filtro de sua idade e/ou pelo início de seu nome.

* O Filtro de idade funciona da seguinte maneira:

    1- Funcionários abaixo de 20 anos; <br/>
    2- Funcionários entre 20 e 30 anos; <br/>
    3- Funcionários entre 31 e 40 anos; <br/>
    4- Funcionários acima de 40 anos;
* A filtragem pelo cargo é baseada em seu _ID_ (obtém-se o _ID_ do cargo pela rota acima).
* O filtro pelo nome é _insensitive case_ (indifere maiusculas e minúsculas) e busca por algo que __comece__ com o que foi entrado. Isto é, caso "art" seja o nome procurado, o funcionário de nome "Artur Freire dos Santos" passará pelo filtro.

> OBS:. Os filtros podem ser combinados ou não.

### Rotas POST

#### Cadastrar um cargo

`/cargos`

Cria um cargo no banco de dados que poderá ser utilizado para atrelar funcionários a este.

__Deve-se passar um objeto com a propriedade__ `nome`, como sugere o JSON abaixo:

```
{
  "nome": "Um cargo novo na empresa!"
}
```

#### Cadastrar um funcionário

`/employee`

Cria um funcionário no banco de dados.

__Deve-se passar um objeto com as propriedades__ `nome`, `idade` e `cargoId`, como sugere o JSON abaixo:

```
{
  "nome": "Artur Freire dos Santos",
  "idade": 19,
  "cargoId": 1
}
```
### Rota PUT
#### Atualizar um funcionário

`/employee/edit`

Altera informações as informações do funcionário no banco de dados.

No corpo da requisição __deve__ conter os campos `id`, `nome`, `idade` e `cargoId`, como ilustra o JSON abaixo: 

```
{
	"id": 1,
	"nome": "Artur Freire dos Santos",
	"idade": 19,
	"cargoId": 1
}
```
### Rota DELETE
#### Deletar um cargo
