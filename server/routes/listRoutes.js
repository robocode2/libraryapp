const express = require('express');
const list_controller = require('../controllers/listController');
const router = express.Router();

// POST request for creating list.
router.post('/list/create', list_controller.list_create_post);

// POST request to delete list.
router.delete('/list/:id', list_controller.list_delete_post);

// POST request to update list.
router.put('/list/:id', list_controller.list_update_post);

// GET request for one list.
router.get('/list/:id', list_controller.list_detail);

// GET request for list of all list items.
router.get('/lists', list_controller.list_list);

//Add book to list

module.exports = router;
