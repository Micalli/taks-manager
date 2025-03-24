
# Task Manager
![demo](https://raw.githubusercontent.com/Micalli/Portifolio-AI/refs/heads/main/front/static/demo.png)

## Tecnologias

<img src="https://skillicons.dev/icons?i=typescript,javascript,html,css,docker,git,prisma,nodejs,express,react,vite,tailwindcss" width="415px" alt="Technologies" />

## 📂 Descrição
Sistema simples de gestão de tarefas


## Rodando o app

#### Clonando o projeto

```bash
git clone https://github.com/Micalli/taks-manager.git && cd taks-manager
```

#### Instale as dependencias

### Back-end
```bash
cd api/
npm i 
```

### Front-end
```bash
cd front/
npm i 
```

#### Rodando PostgreSQL com Docker

O banco de dados pode ser iniciado localmente com um  [Docker Container](https://www.docker.com/resources/what-container/).

Verifique a documentação oficial para instalar o [Docker Engine](https://docs.docker.com/engine/install/ubuntu/).

```bash
docker run --name pg -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres
```

Em seguida dê esses comandos para criar a tabela dentro do container
```bash
#Entra no bash do container
docker exec -it pg bash

#Entra no postgres
psql -U  root

#Cria o banco
CREATE DATABASE nomeDoBanco;
```
#### Rodando o back end

```bash
cd api && npm run dev
```

#### Rodando o  front end

```bash
cd frontend && npm run dev
```

## Entrei em contato
Feito com :green_heart: por [Bruno Micalli](https://github.com/micalli).


[![Linkedin Badge](https://img.shields.io/badge/-Bruno_Micalli-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/brunomicalli/)](https://www.linkedin.com/in/brunomicalli/)
