const express = require('express');
const listController = require('../controllers/listController');
const router = express.Router();

router.post('/lists/create', listController.createList);

//router.delete('/lists/:name', list_controller.list_delete);

//router.put('/lists/:name', list_controller.list_update);

router.get('/lists/:id', listController.getListDetails);

router.get('/lists', listController.getUserLists);

module.exports = router;
