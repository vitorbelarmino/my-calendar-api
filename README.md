#  MyCalendar API

## 💻 Projeto

Este projeto faz parte de uma solução completa de calendário, composta por backend e frontend:
- 🔗 Frontend: [my-calendar-app](https://github.com/vitorbelarmino/my-calendar-app)

MyCalendar API é uma solução de backend robusta para o gerenciamento de eventos pessoais. Desenvolvida com foco em escalabilidade e segurança, a API oferece um ecossistema completo para autenticação, controle de usuários e manipulação de calendários com validações rigorosas.

Construída com Node.js, Prisma ORM e MySQL, a aplicação é totalmente conteinerizada via Docker, garantindo uma implantação rápida e consistente em qualquer ambiente.

---

### 🚀 Principais Destaques
- API RESTful moderna, pronta para produção
- Autenticação JWT e refresh seguro
- CRUD completo de usuários e eventos
- Validação de dados e tratamento global de erros
- Fácil deploy local ou em containers

---

## 📝 Funcionalidades
 Cadastro e login de usuários (JWT)
 Refresh de token
 Recuperação dos dados do usuário autenticado via token
 CRUD de eventos (criar, listar, buscar, editar, excluir)
 Validação de dados (Joi)
 Proteção de rotas (middleware)
 Tratamento global de erros

---

## 🛠️ Tecnologias & Ferramentas
- TypeScript
- Node.js
- Express
- Prisma ORM
- MySQL
- Docker & Docker Compose
- Joi
- JWT
- Bcrypt
- ESLint & Prettier

---

## 📁 Estrutura do Projeto
```
├── src/
│   ├── modules/
│   │   ├── Auth/      # autenticação
│   │   ├── User/      # usuário
│   │   └── Event/     # eventos
│   ├── middlewares/   # validação, auth, erros
│   ├── config/        # database
│   ├── routes/        # rotas principais
│   └── Utils/         # helpers
├── prisma/            # schema, migrations
├── Dockerfile
├── docker-compose.yml
├── package.json
└── ...
```

---

## ⬇️ Como executar o projeto

### Usando Docker (recomendado)
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/my-calendar-api.git
cd my-calendar-api

# Crie o arquivo .env
cp .env.example .env
# Ou crie manualmente:
MYSQL_ROOT_PASSWORD=suasenha
MYSQL_DATABASE=mycalendar
MYSQL_USER=root
MYSQL_PORT=3306
APP_PORT=3333
JWT_SECRET=seuSegredoJWT
DATABASE_URL="sua string de conexão com o banco"

# Suba os containers
npm run app:up

# Rode as migrations
npm run docker:migrate

# API disponível em http://localhost:3333
```


### Rodando localmente
```bash
# Instale dependências
npm install

# Configure o .env (veja exemplo acima)

# Suba o banco de dados (recomendado via Docker Compose)
npm run db:up
# Ou suba manualmente um MySQL local
# Atualize DATABASE_URL no .env para apontar para seu banco local

# Rode as migrations
npx prisma migrate dev

# Inicie a API
npm run dev
```

---

- `POST /auth/register` — cadastro
- `POST /auth/login` — login
- `POST /auth/refresh` — refresh token
- `GET /auth/me` — recuperar dados do usuário autenticado (via token)
- `GET /users/:id` — buscar usuário por id
- `PUT /users/:id` — atualizar usuário
- `DELETE /users/:id` — remover usuário
- `POST /events` — criar evento
- `GET /events` — listar eventos do usuário
- `GET /events/:id` — buscar evento
- `PUT /events/:id` — editar evento
- `DELETE /events/:id` — remover evento

---

## 👤 Autor
- GitHub: [https://github.com/vitorbelarmino](https://github.com/vitorbelarmino)
- LinkedIn: [https://www.linkedin.com/in/vitor-belarmino/](https://www.linkedin.com/in/vitor-belarmino/)
- Email: vitor.belarmino@hotmail.com
