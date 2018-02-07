const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'GET to /ep2'
	});
});

router.post('/', (req, res, next) => {
	res.status(201).json({
		message: 'POST to /ep2'
	});
});

router.get('/:id', (req, res, next) => {
	res.status(200).json({
		message: 'GET to /ep2/id',
	});
});

router.post('/:id', (req, res, next) => {
	res.status(200).json({
		message: 'POST to /ep2/id',
	});
});

router.patch('/:id', (req, res, next) => {
	res.status(200).json({
		message: 'PATCH to /ep2/id',
	});	
});

router.delete('/:id', (req, res, next) => {
	res.status(200).json({
		message: 'DELETE to /ep2/id',
	});
});

module.exports = router;