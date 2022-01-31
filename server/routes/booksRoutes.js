const express = require('express');
const book_controller = require('../controllers/bookController');
const router = express.Router();

// GET catalog home page.
//router.get('/', book_controller.index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
//router.get('/book/create', book_controller.book_create_get);

// POST request for creating Book.
router.post('/books/create', book_controller.book_create_post);

// GET request to delete Book.
//router.get('/book/:id/delete', book_controller.book_delete_get);

// POST request to delete Book.
router.delete('/books/:id', book_controller.book_delete_post);

// GET request to update Book.
//router.get('/book/:id/update', book_controller.book_update_get);

// POST request to update Book.
router.put('/books/:id', book_controller.book_update_post);

// GET request for one Book.
router.get('/books/:id', book_controller.book_detail);

// GET request for list of all Book items.
router.get('/books', book_controller.book_list);

module.exports = router;
