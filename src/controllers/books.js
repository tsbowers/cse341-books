import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  authorExists
} from '../models/books.js';

const isValidString = (value) => {
  return typeof value === 'string' && value.trim().length > 0;
};

const isValidPublicationDate = (value) => {
  return typeof value === 'string'
    && /^\d{4}-\d{2}-\d{2}$/.test(value);
};

const getBooksHandler = async (req, res) => {
  try {
    const books = await getAllBooks();

    return res.status(200).json(books);
  } catch (error) {
    console.error('GET /books failed:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getBookByIdHandler = async (req, res) => {
  const requestedId = req.params.id;

  try {
    const book = await getBookById(requestedId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error('GET /books/:id failed:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const createBookHandler = async (req, res) => {
  const {
    id,
    title,
    publicationDate,
    authorId
  } = req.body;

  if (
    !isValidString(id)
    || !isValidString(title)
    || !isValidPublicationDate(publicationDate)
    || !isValidString(authorId)
  ) {
    return res.status(400).json({
      message: 'id, title, publicationDate, and authorId are required and must be valid.'
    });
  }

  try {
    const existingBook = await getBookById(id);

    if (existingBook) {
      return res.status(400).json({
        message: 'Book id already exists.'
      });
    }

    const authorIsValid = await authorExists(authorId);

    if (!authorIsValid) {
      return res.status(400).json({
        message: 'Author not found.'
      });
    }

    const book = {
      id,
      title: title.trim(),
      publicationDate,
      authorId
    };

    const createdBook = await createBook(book);

    return res.status(201).json(createdBook);
  } catch (error) {
    console.error('POST /books failed:', error.message);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

const updateBookHandler = async (req, res) => {
  const requestedId = req.params.id;
  const {
    title,
    publicationDate,
    authorId
  } = req.body;

  if (
    !isValidString(title)
    || !isValidPublicationDate(publicationDate)
    || !isValidString(authorId)
  ) {
    return res.status(400).json({
      message: 'title, publicationDate, and authorId are required and must be valid.'
    });
  }

  try {
    const existingBook = await getBookById(requestedId);

    if (!existingBook) {
      return res.status(404).json({
        message: 'Book not found'
      });
    }

    const authorIsValid = await authorExists(authorId);

    if (!authorIsValid) {
      return res.status(400).json({
        message: 'Author not found.'
      });
    }

    const updatedBook = await updateBook(requestedId, {
      title: title.trim(),
      publicationDate,
      authorId
    });

    return res.status(200).json(updatedBook);
  } catch (error) {
    console.error('PUT /books/:id failed:', error.message);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

const deleteBookHandler = async (req, res) => {
  const requestedId = req.params.id;

  try {
    const existingBook = await getBookById(requestedId);

    if (!existingBook) {
      return res.status(404).json({
        message: 'Book not found'
      });
    }

    await deleteBook(requestedId);

    return res.status(204).send();
  } catch (error) {
    console.error('DELETE /books/:id failed:', error.message);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

export {
  getBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  updateBookHandler,
  deleteBookHandler
};