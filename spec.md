# Books API Spec

## Version 1

# Books API Spec

## Purpose
Create a basic web service that returns book data.

## Data Model
Book fields:
- id: string
- author: string
- title: string
- publicationDate: string

## Endpoints
1. GET /books
- Returns all books.
- Response status: 200 on success.

2. GET /books/:id
- Returns one book with matching id.
- Response status: 200 on success.
- If no match: 404.

## Initial assumptions
- Data is stored in MongoDB collection named books.
- API returns JSON.

## Evaluation

1. Without a specified format developers might use different date formats, causing inconsistent data and errors when the API tries to read or sort dates.
2. Returning the full database error message to the client could expose internal details, such as collection names or driver information, giving attackers useful information about the system.
3. If `GET /books` returns every field of every document with no limit, the response could become very large and slow as the collection grows.
4. Version 1 does not show an actual JSON response example or explain what happens when `GET /books/:id` cannot find a matching book, making the API behavior unclear.

## Version 2

# Books API Spec

## Purpose
Build a read-only Books API in Express with MongoDB storage.

## Data Model
MongoDB database: cse341-books-db
MongoDB collection: books

Book object:
- id: string (required)
- author: string (required)
- title: string (required)
- publicationDate: string in ISO 8601 date format (for example, "2021-08-17") (required)

## Endpoints
1. GET /books
- Description: Return all books.
- Success status: 200
- Error status: 500
- Success response body example:
[
  {
    "id": "b1",
    "author": "Maya Rivera",
    "title": "Patterns of Light",
    "publicationDate": "2021-08-17"
  }
]

2. GET /books/:id
- Description: Return one book by id.
- Success status: 200
- Not found status: 404
- Error status: 500
- Success response body example:
{
  "id": "b1",
  "author": "Maya Rivera",
  "title": "Patterns of Light",
  "publicationDate": "2021-08-17"
}
- Not found response body example:
{
  "message": "Book not found"
}

## Error Handling
- Do not return stack traces to clients.
- Return a simple message for 500 errors:
{
  "message": "Internal server error"
}

## Implementation Notes
- Use a MongoDB collection named `books`.
- Seed the collection with the book documents needed for testing.
- Use environment variables for the MongoDB connection.

## Out of Scope for Week 1
- POST, PUT, DELETE routes
- Authentication and authorization