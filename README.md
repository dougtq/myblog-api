# Blog API

## Instruções

Essas instruções vão te preparar uma cópia do projeto que pode ser executada localmente via Docker

### Pré requisitos

* [MongoDB](https://www.mongodb.com/download-center?jmp=homepage#community) 
* [Nodejs && NPM](https://nodejs.org/) - Versão 16 >
* [Docker](https://www.docker.com/get-docker) 
* [Docker Compose](https://docs.docker.com/compose/install/#install-compose)

### Instalação

Comando para instalar as bibliotecas do projeto:

```sh
npm install
```

## Variáveis de ambiente
Para efeito de exemplo o arquivo .env já esta salvo o que nos facilita a execução do projeto.
Em um caso de projeto "production-ready" o arquivo .env não estaria no repositório.

## Executando a API
Inicie a API e o banco de dados (mongodb).

**Garanta que as portas dos dois containers (banco e api) de valores: 28017 e 3000 não estejam sendo utilizadas por outro(s) processo(s)**

Subir containers:
```sh
docker-compose up -d
```

Fazer requisição para ver se API já esta de pé:
```sh
curl localhost:3000/health
```
Resposta esperada:
```sh
{"message":"Server is running :D"}
```

## Rodando os testes

Rodar os testes uma única vez:
```sh
npm run test
```
Rodar os testes a cada mudança nos arquivos:
```sh
npm run test:live
```


## Documentação

- Existe uma documentação Swagger da API em ./docs/swagger para ser importada no [Editor Swagger](https://editor.swagger.io/)

- Existe uma coleção Postman da API em ./docs/postman para ser importada no [Postman](https://www.postman.com/downloads/)

## Ferramentas

* [Express](http://www.expressjs.com/)

* [MongoDB](https://www.mongodb.com/)

* [Mongoose](http://mongoosejs.com)

## Autor

* **[Douglas E. Alves](https://github.com/dougtq)**
