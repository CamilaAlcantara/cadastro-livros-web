
# 📚 Livros Web

Aplicação frontend desenvolvida em **Angular 15 + Bootstrap 5** para gerenciamento de livros, autores e assuntos.

Este projeto consome a API `livros-api`, responsável pelo CRUD das entidades e geração de relatório em PDF.

---

## 🚀 Tecnologias

- Angular 15
- Bootstrap 5
- TypeScript
- HttpClient
- Reactive Forms

---

## 🌎 Ambiente de Desenvolvimento

Este projeto foi desenvolvido utilizando:

- Node 18+
- Angular CLI 15.2.11

---

## 🔗 Integração com API

A aplicação espera que a API esteja rodando em:

```
http://localhost:8080
```

Caso necessário, altere o arquivo:

```
src/environments/environment.ts
```

Exemplo:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
```

---

## ▶️ Como rodar o projeto

### 1️⃣ Instalar dependências

```bash
npm install
```

### 2️⃣ Executar

```bash
ng serve
```

Acesse no navegador:

```
http://localhost:4200
```

---

## 📌 Funcionalidades

- CRUD de Autores
- CRUD de Assuntos
- CRUD de Livros
  - Campo obrigatório **Valor (R$)**
  - Relacionamento N:N com Autores e Assuntos
- Geração de relatório em PDF (consumindo endpoint da API)

---

## 🧾 Relatório

O botão **"Gerar Relatório"** realiza chamada ao endpoint:

```
GET /relatorios/livros-por-autor
```

O download do PDF é realizado automaticamente pelo navegador.

---

## 🏗️ Estrutura do Projeto

A aplicação está organizada por módulos de domínio:

- `autores/`
- `assuntos/`
- `livros/`

Cada módulo possui:

- Componente de listagem
- Componente de formulário
- Service responsável pelo consumo da API

A comunicação com o backend é realizada via `HttpClient`, centralizada em services específicos por entidade.

---

## ⚠️ Observações

- O backend deve estar rodando antes de iniciar o frontend.
- O projeto utiliza Reactive Forms com validação obrigatória para campos essenciais.
- A aplicação segue organização modular para separação de responsabilidades.

---
## 🔧 Backend

A API responsável pelos dados está disponível em:

https://github.com/CamilaAlcantara/cadastro-livros-api

## 📬 Contato
Desenvolvido por **Camila Alcantara**  
📧 E-mail: camila.m.a.alcantara@gmail.com
