# Прокетная рабта

## Тема: «api для сайта»

### Технологии

Язык: **NodeJS**
СУБД: **PostgreSQL**
Протокол обмена данными: **QraphQL RestApi**

---

### Сущность User

**id** - id поста (<ins>bigint</ins>)

**login** - логин (<ins>character varying</ins>)

**password** - пароль (<ins>character varying</ins>)

**name** - имя (<ins>character varying</ins>)

**surname** - фамилия (<ins>character varying</ins>)

**created_at** - создан (<ins>timestamp with time zone</ins>)

**updated_at** - обновлен (<ins>timestamp with time zone</ins>)

---

### API

### Список пользователей 'query users'

```gql
query {
  users {
    id
    name
    surname
    login
    created_at
    updated_at
  }
}
```

### Пользователь по id 'query user'

```gql
query {
  user(id: 10) {
    id
    name
    surname
    login
    created_at
    updated_at
  }
}
```

### Обновить пользователя 'mutation updateUser'

```gql
mutation {
  updateUser(id: 10, updateUserInput: { name: "Dima" }) {
    id
  }
}
```

### Добавить пользователя 'mutation createUser'

```gql
mutation {
  createUser(
    createUserInput: {
      login: "admin"
      password: "11111"
      name: "Ivan"
      surname: "Ivanov"
    }
  ) {
    id
  }
}
```

---

### Авторизация

#### Запрос:

POST **/auth/login**

```
{
	"username": "admin",
	"password": "11111"
}
```

#### Ответ

```
{
	"access_token": "Ваш токен"
}
```

---

### Сущность Post

**id** - id поста (<ins>bigint</ins>)

**name** - имя поста (<ins>character varying</ins>)

**text** - содержание поста (<ins>character varying</ins>)

**title** - заголовок поста (<ins>character varying</ins>)

**type** - тип поста (post|news|page) (<ins>character varying</ins>)

**meta_keywords** - ключевые слова (<ins>character varying</ins>)

**meta_description** - описание (<ins>character varying</ins>)

**created_at** - создан (<ins>timestamp with time zone</ins>)

**updated_at** - обновлен (<ins>timestamp with time zone</ins>)

---

### API

#### Верификация

headers:
Authorization: ваш токен

---

### Список постов 'query posts'

#### Параметры

**paginateInput**:
{
&nbsp;&nbsp;&nbsp;&nbsp;**page**: страница
&nbsp;&nbsp;&nbsp;&nbsp;**length**: количество элементов на странице
}
**postTypeInput**:
{
&nbsp;&nbsp;&nbsp;&nbsp;**type**: post|news|page
}

```gql
query {
  posts(
    paginateInput: { page: 1, length: 10 }
    postTypeInput: { type: "post" }
  ) {
    list {
      id
      name
      text
      sort
      type
      title
      meta_keywords
      meta_description
      created_at
      updated_at
    }
    count
  }
}
```

### Получить пост по ID 'query post'

#### Параметры

**id**: идентификатор поста

```gql
query {
  post(id: 1) {
    id
    name
    text
    type
    title
    meta_keywords
    meta_description
  }
}
```

### Обновить пост 'mutation updatePost'

#### Параметры

**id** - идентификатор поста
**updatePostInput** - данные для обновления

```gql
mutation {
  updatePost(id: 1, updatePostInput: { sort: 60 }) {
    id
    sort
  }
}
```

### Обновить пост 'mutation createPost'

#### Параметры

**createPostInput** данные для добавлеия

```gql
mutation {
  createPost(
    createPostInput: {
      name: "Новый пост"
      text: "какой то текст"
      title: "заголовок"
      meta_keywords: "ключевые слова"
      meta_description: "описание"
      type: "post"
    }
  ) {
    id
  }
}
```

### Удалить пост 'mutation deletePost'

#### Параметры

**id** - идентификатор поста

```gql
mutation {
  deletePost(id: 1) {
    id
  }
}
```
