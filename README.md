# Домашняя работа 8

## ORM

#### Поля

**id** - id поста
**name** - название поста
**text** - содержание поста

#### API

**список постов**

```gql
query {
  posts {
    id
    name
    text
  }
}
```

**один пост**

```gql
query {
  post(id: 2) {
    id
    name
  }
}
```

**добавить пост**

```gql
mutation {
  createPost(createPostInput: { name: "post name" }) {
    id
  }
}
```

**обновить пост**

```gql
mutation {
  updatePost(id: 5, updatePostInput: { text: "posttext", name: "post name" }) {
    id
    name
    text
  }
}
```

**удалить пост**

```gql
mutation {
  deletePost(id: 5) {
    id
    name
  }
}
```
