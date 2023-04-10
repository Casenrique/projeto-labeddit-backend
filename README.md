


# **Projeto Labeddit Backend**

API para aplicativo de rede social com interação de postagem, comentário da postagem e reações às postagens e comentários.

Aplicação back-end de servidor express com banco de dados sqlite3.

## Índice
- <a href="#link-do-repositório-do-frontend">Link do respositório do Frontend</a>
- <a href="#métodos">Métodos disponíveis na API</a>
- <a href="#respostas">Respostas esperadas</a>
- <a href="#fluxograma-do-banco-de-dados">Fluxograma do bando de dados</a>
- <a href="#documentação">Documentação</a>
- <a href="#tecnologias-utilizadas">Tecnologias utilizadas</a>
- <a href="#pessoas-autoras">Pessoas autoras</a>
- <a href="#próximos-passos">Próximos passos</a>


## Link do respositório do Frontend

https://github.com/Casenrique/projeto-labeddit-frontend


## Métodos
Requisições para a API devem seguir os padrões:
| Método | Descrição |
|---|---|
| `GET` | Retorna informações de um ou mais registros. |
| `POST` | Utilizado para criar um novo registro. |
| `PUT` | Atualiza dados de um registro ou altera sua situação. |
| `DELETE` | Remove um registro do sistema. |

## Respostas

| Código | Descrição |
|---|---|
| `200` | Requisição executada com sucesso (success).|
| `400` | Erros de validação ou os campos informados não existem no sistema.|
| `404` | Registro pesquisado não encontrado (Not found).|
| `409` | Registro pesquisado já existente.|

## Fluxograma do Banco de Dados
![Projeto Labeddit](https://user-images.githubusercontent.com/80413608/230808534-258d66b6-8695-422e-acc6-b75fc8cb2efa.png)

https://dbdiagram.io/d/640b1861296d97641d86f731

## Documentação
[Link Demonstração](https://documenter.getpostman.com/view/24424903/2s93JzN21N)

## Tecnologias utilizadas

1. [Node.js](https://nodejs.org/en/)
2. [Typescript](https://www.typescriptlang.org/)
3. [Express](https://expressjs.com/pt-br/)
4. [Cors](https://www.npmjs.com/package/cors)
5. [Knex](https://knexjs.org/)
6. [Sqlite3](https://www.sqlitetutorial.net/)
7. [Jest](https://jestjs.io/pt-BR/)

## Pessoas Autoras

<img style="width:200px" src="https://github.com/Casenrique.png" alt="Imagem do desenvolvedor">

[Linkedin](https://www.linkedin.com/in/carlos-henrique-de-souza-1767311a/)

## Próximos passos

- [ ] Inclusão de método para reset de senha do usuário.
- [ ] Refatoração de código para código mais limpo.



