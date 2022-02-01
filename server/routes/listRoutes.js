const express = require('express');
const list_controller = require('../controllers/listController');
const router = express.Router();

router.post('/lists/create', list_controller.list_create);

//router.delete('/lists/:name', list_controller.list_delete);

//router.put('/lists/:name', list_controller.list_update);

router.get('/lists/:name', list_controller.list_details);

router.get('/lists', list_controller.lists_list);

module.exports = router;
