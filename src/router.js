import express from 'express';
import { getBooksHandler, getBookByIdHandler } from './controllers/books.js';

// The router's ONLY job is to connect a URL + HTTP method to a controller function.
// It doesn't touch the database or decide what response to send — it just routes.

const router = express.Router();

router.get('/books', getBooksHandler);
// GET request to /books  -> run getBooksHandler

router.get('/books/:id', getBookByIdHandler);
// GET request to /books/anything -> run getBookByIdHandler
// the ':id' part is a placeholder that captures whatever comes after /books/

export default router;