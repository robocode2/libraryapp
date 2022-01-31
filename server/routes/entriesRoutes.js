const express = require('express');
const entries_controller = require('../controllers/entriesController');
const router = express.Router();

// add book to a list
// POST request for creating book entry in (which?) list.
router.post('/entries/create', entries_controller.list_add_book);

// remove book from a list
// POST request to delete book entry from (which?) list.
//router.delete('/entries/:listid/:bookid', entries_controller.list_remove_book);
router.post('/entries/delete', entries_controller.list_remove_book);

// GET request for one list.
router.get('/entries/:id', entries_controller.list_entries);

// delete a list, delete all entries with listid
// POST request to delete list. // connect to list controllers
router.delete('/entries/delete/:listid', entries_controller.list_delete);

// if a user is deleted from the database, delete all related entries
//OnCascade?
// 90% I probably should  add user's id to this table

// if a book is deleted from the database, delete all related entries
//OnCascade?

module.exports = router;
