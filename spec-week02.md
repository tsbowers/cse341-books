# Books API Week 02 Spec

# Version 1

## Feature 1: Book CRUD Operations and Author References

### Goal

Update the Week 01 Books API to support full CRUD operations and connect books to authors using `authorId`.

### Data Model

Books are stored in the `books` collection.

Required fields:

* `id`: string, custom id such as `b1`
* `authorId`: string, references an author's custom `id`
* `title`: string
* `publicationDate`: string

MongoDB `_id` will not be used for routes.

### Routes

GET `/books`

* `200`: returns an array of books
* `500`: unexpected server or database error

GET `/books/:id`

* `200`: returns the book
* `404`: book not found
* `500`: unexpected server or database error

POST `/books`

Request:

```json
{
  "id": "b4",
  "authorId": "a1",
  "title": "Example Book",
  "publicationDate": "2026-01-15"
}
```

* `201`: book created
* `400`: missing field, duplicate id, or author does not exist
* `500`: unexpected server or database error

PUT `/books/:id`

Request:

```json
{
  "authorId": "a2",
  "title": "Updated Book",
  "publicationDate": "2026-02-20"
}
```

* `200`: book updated
* `400`: missing field or author does not exist
* `404`: book not found
* `500`: unexpected server or database error

DELETE `/books/:id`

* `204`: book deleted, no response body
* `404`: book not found
* `500`: unexpected server or database error

### Swagger and Deployment

All book routes will be documented in Swagger and tested locally and on the deployed Render `/api-docs` page.

## Feature 2: Author CRUD Operations

### Goal

Create an Authors API with full CRUD operations and custom ids.

### Data Model

Authors are stored in the `authors` collection.

Required fields:

* `id`: string, custom id such as `a1`
* `name`: string
* `birthYear`: integer

### Routes

GET `/authors`

* `200`: returns an array of authors
* `500`: unexpected server or database error

GET `/authors/:id`

* `200`: returns the author
* `404`: author not found
* `500`: unexpected server or database error

POST `/authors`

Request:

```json
{
  "id": "a4",
  "name": "Example Author",
  "birthYear": 1980
}
```

* `201`: author created
* `400`: missing or invalid field, or duplicate id
* `500`: unexpected server or database error

PUT `/authors/:id`

Request:

```json
{
  "name": "Updated Author",
  "birthYear": 1981
}
```

* `200`: author updated
* `400`: missing or invalid field
* `404`: author not found
* `500`: unexpected server or database error

DELETE `/authors/:id`

* `204`: author deleted, no response body
* `404`: author not found
* `409`: author still has books referencing it
* `500`: unexpected server or database error

### Swagger and Deployment

All author routes will be documented in Swagger and tested locally and on the deployed Render `/api-docs` page.

# Evaluation

1. Duplicate ids should be rejected.
2. Books should only reference authors that exist.
3. An author should not be deleted while books reference that author.
4. Client input should be validated.
5. Raw database errors should not be returned to clients.
6. Database queries should check only the needed records.
7. Status codes and error responses should be consistent and documented.

# Version 2

## Books

The Books API will use custom string ids and require `id`, `authorId`, `title`, and `publicationDate`. `authorId` must match an existing author.

POST and PUT will validate the required fields and author relationship. Duplicate book ids will return `400`. Missing books will return `404`. DELETE will return `204` with no body. Unexpected database errors will return `500`.

## Authors

The Authors API will use custom string ids and require `id`, `name`, and `birthYear`. Duplicate ids and invalid data will return `400`. Missing authors will return `404`.

An author cannot be deleted if a book references that author. That situation returns `409`. A successful delete returns `204` with no body.

Both APIs will return safe error messages, document all routes in Swagger, and be tested locally and through the deployed Render `/api-docs` page.
