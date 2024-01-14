# Musixe - API de Encurtamento de URL
## Instalação

Certifique-se de ter o Node.js instalado em seu sistema. Em seguida, execute o seguinte comando no terminal do projeto:

```bash
npm install -g
```
## Comandos
`npm install -g` : Instala globalmente as dependências do projeto. <br />
`npm install` : Instala as dependências do projeto. <br />
`npm start` : Inicia o projeto. <br />

O projeto será iniciado em https://localhost:3000.

## Endpoints
- " / " : Raiz do projeto.

- " /new " : Rota para o método POST, utilizado para encurtar uma URL longa.

- " /delete " : Rota para o método DELETE, usado para excluir uma URL encurtada.

- " /code " : Rota para o método PUT, empregado para alterar o código da URL longa ao substituir o code pelo codigo gerado pela URL encurtada passando a nova URL longa como requisição.

- " /view/code " : Ao substituir o code pelo codigo da URL encurtada permite a visualização da URL longa associada ao código gerado na URL encurtada.

## Tecnologias
- HTML
- CSS
- JavaScript
- Node.js
- Express
- SQLite3

## Licença
Este projeto está sob a MIT License.

## Projeto na Nuvem
Confira o projeto em nuvem: https://musixe.onrender.com/ <br />

obs: Demora um pouco pra carregar.
