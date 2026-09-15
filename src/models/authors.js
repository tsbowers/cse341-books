import { getDb } from '../db/connect.js';

// The model's job is to talk to MongoDB.
const getAllAuthors = async () => {
  const db = getDb();
  const collection = db.collection('authors');
  const authors = await collection.find({}).toArray();

  return authors;
};

const getAuthorById = async (authorId) => {
  const db = getDb();
  const collection = db.collection('authors');
  const author = await collection.findOne({ id: authorId });

  return author;
};

const createAuthor = async (author) => {
  const db = getDb();
  const collection = db.collection('authors');
  await collection.insertOne(author);

  return author;
};

const updateAuthor = async (authorId, author) => {
  const db = getDb();
  const collection = db.collection('authors');
  const result = await collection.updateOne(
    { id: authorId },
    { $set: author }
  );

  if (result.matchedCount === 0) {
    return null;
  }

  return collection.findOne({ id: authorId });
};

const deleteAuthor = async (authorId) => {
  const db = getDb();
  const collection = db.collection('authors');
  const result = await collection.deleteOne({ id: authorId });

  return result.deletedCount > 0;
};

const authorHasBooks = async (authorId) => {
  const db = getDb();
  const collection = db.collection('books');
  const book = await collection.findOne({ authorId });

  return Boolean(book);
};

export {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  authorHasBooks
};
