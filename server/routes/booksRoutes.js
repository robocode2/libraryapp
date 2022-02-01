const express = require('express');
const book_controller = require('../controllers/bookController');
const router = express.Router();

router.post('/books/create', book_controller.book_create_post);
//axios delete?
router.delete('/books/:id', book_controller.book_delete_post);

router.put('/books/:id', book_controller.book_update_post);

router.get('/books/:id', book_controller.book_detail);

router.get('/books', book_controller.book_list);

module.exports = router;
