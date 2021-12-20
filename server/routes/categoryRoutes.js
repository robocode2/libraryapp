const express = require('express');
const category_controller = require('../controllers/categoryController');
const router = express.Router();

// POST request for creating Category.
router.post('/category/create', category_controller.category_create_post);

// POST request to delete Category.
router.delete('/category/:id', category_controller.category_delete_post);

// POST request to update Category.
router.put('/category/:id', category_controller.category_update_post);

// GET request for one Category.
router.get('/category/:id', category_controller.category_detail);

// GET request for list of all Category items.
router.get('/categories', category_controller.category_list);

//Add category to book

module.exports = router;
