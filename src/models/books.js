import { getDb } from '../db/connect.js';

// The model's job is ONLY to talk to the database.
// It doesn't know anything about HTTP, requests, or responses.

const getAllBooks = async () => {
  const db = getDb();                          // get the active database connection
  const collection = db.collection('books');   // point at the 'books' collection
  const books = await collection.find({}).toArray();
  // find({}) with an empty filter matches every document.
  // find() returns a "cursor" (a pointer to results), not an array,
  // so toArray() pulls everything into a real JavaScript array.
  return books;
};

const getBookById = async (bookId) => {
  const db = getDb();
  const collection = db.collection('books');
  const book = await collection.findOne({ id: bookId });
  // findOne() stops after the first match instead of scanning everything,
  // and returns either one document, or null if nothing matched.
  // { id: bookId } filters on OUR custom "id" field (like "b1"),
  // not MongoDB's own auto-generated "_id" field.
  return book;
};

// Both functions must be listed here, or other files can't import them.
export { getAllBooks, getBookById };