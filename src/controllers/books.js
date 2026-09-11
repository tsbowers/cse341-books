import { getAllBooks, getBookById } from '../models/books.js';

// The controller's job is to handle the HTTP side: read the request,
// call the model to get data, and decide what status code + body to send back.

const getBooksHandler = async (req, res) => {
  try {
    const books = await getAllBooks();          // ask the model for everything
    return res.status(200).json(books);         // 200 = success, send the array as JSON
  } catch (error) {
    console.error('GET /books failed:', error.message); // log real details for ME to debug
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getBookByIdHandler = async (req, res) => {
  const requestedId = req.params.id;
  // Express fills req.params.id automatically from the route pattern
  // '/books/:id' — whatever's in the URL after /books/ lands here.

  try {
    const book = await getBookById(requestedId); // ask the model for one specific book

    if (!book) {
      // The database successfully ran the query, it just found nothing.
      // This is NOT an error — it's a normal, expected outcome.
      return res.status(404).json({ message: 'Book not found' });
    }

    // A matching book WAS found.
    return res.status(200).json(book);
  } catch (error) {
    // This only runs for genuine failures — not "book doesn't exist,"
    // but something actually going wrong (e.g. database connection drops).
    console.error('GET /books/:id failed:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Export both handlers so router.js can wire them up to URLs.
export { getBooksHandler, getBookByIdHandler };