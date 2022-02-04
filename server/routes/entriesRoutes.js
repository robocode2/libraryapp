const express = require('express');
const entryController = require('../controllers/entriesController');
const router = express.Router();

router.post('/entries/create', entryController.addBook);

router.post('/entries/delete', entryController.removeBook);

router.get('/entries/:id', entryController.getListEntries);

module.exports = router;
