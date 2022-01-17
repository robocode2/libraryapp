const express = require('express');
const list_controller = require('../controllers/listController');
const router = express.Router();

// POST request for creating list.
router.post('/lists/create', list_controller.list_create);

// POST request to delete list.
router.delete('/lists/:name', list_controller.list_delete);

// POST request to update list.
router.put('/lists/:name', list_controller.list_update);

// GET request for one list.
router.get('/lists/:name', list_controller.list_details);

// GET request for list of all list items.
router.get('/lists', list_controller.lists_list);

// GET request for list of all list items for a particular user. FUTURE YSE
//router.get('/lists/?user_uid={user_uid}', list_controller.userlists_list);
//router.get('/lists', list_controller.userlists_list);

// GET request for list of user;s books in a particular list.
//router.get('/lists/:listname', list_controller.user_list);

//Add book to list

// BLA BLA BLA HERE PLEASE IMPLEMENT ADDING BOOK To LIST

module.exports = router;
