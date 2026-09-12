import express from 'express';
import { getBooksHandler, getBookByIdHandler } from './controllers/books.js';

// The router's ONLY job is to connect a URL + HTTP method to a controller function.
// It doesn't touch the database or decide what response to send — it just routes.

const router = express.Router();

/**
 * @openapi
 * /books:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: Successfully retrieved all books
 *       500:
 *         description: Internal server error
 */
router.get('/books', getBooksHandler);
// GET request to /books  -> run getBooksHandler

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The book ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the book
 *       400:
 *         description: Invalid book ID
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.get('/books/:id', getBookByIdHandler);
// GET request to /books/anything -> run getBookByIdHandler
// the ':id' part is a placeholder that captures whatever comes after /books/

export default router;