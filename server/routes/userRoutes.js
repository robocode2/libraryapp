const express = require('express');
const user_controller = require('../controllers/userController');
const router = express.Router();

// POST request to delete user.
//delete subsequent lists, and list_entries (using user id or query through lists table?)
router.delete('/user/:id', user_controller.user_delete);

// POST request to update user. (user name to ka)
router.put('/user/:id', user_controller.user_update);

// POST request for creating user (if not already there :D) Not sure if we need this route
//router.post('/user/create', user_controller.user_create_post);

// GET request for list of all user lists (for public display later?).
//router.get('/categories', user_controller.user_list);

// GET request for one user.
//router.get('/user/:id', user_controller.user_detail);

module.exports = router;
