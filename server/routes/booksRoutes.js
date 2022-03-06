const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();

router.post('/books/create', bookController.createBook);

router.delete('/books/:id', bookController.deleteBook);

router.put('/books/:id', bookController.updateBook);

router.get('/books/:id', bookController.getBook);

router.get('/books', bookController.getBooks);

module.exports = router;
