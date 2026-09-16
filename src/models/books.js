import { getDb } from '../db/connect.js';

const getAllBooks = async () => {
  const db = getDb();
  const collection = db.collection('books');

  const books = await collection.find({}).toArray();

  return books;
};

const getBookById = async (bookId) => {
  const db = getDb();
  const collection = db.collection('books');

  const book = await collection.findOne({ id: bookId });

  return book;
};

const createBook = async (book) => {
  const db = getDb();
  const collection = db.collection('books');

  await collection.insertOne(book);

  return book;
};

const updateBook = async (bookId, updatedBook) => {
  const db = getDb();
  const collection = db.collection('books');

  await collection.updateOne(
    { id: bookId },
    { $set: updatedBook }
  );

  return collection.findOne({ id: bookId });
};

const deleteBook = async (bookId) => {
  const db = getDb();
  const collection = db.collection('books');

  await collection.deleteOne({ id: bookId });
};

const authorExists = async (authorId) => {
  const db = getDb();
  const collection = db.collection('authors');

  const author = await collection.findOne({ id: authorId });

  return Boolean(author);
};

export {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  authorExists
};