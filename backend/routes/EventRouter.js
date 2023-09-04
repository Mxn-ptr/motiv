const eventController = require('../controllers/eventController');
const router = require('express').Router();

router.post('/', eventController.createEvent);
router.get('/:id', eventController.getOneEvent);
router.delete('/:id', eventController.deleteEvent);
router.post('/join/:id', eventController.joinEvent);

module.exports = router;
