const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//ACCEPTING FILES
const multer = require('multer');
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	}
});
const fileFilter = function(req, file, cb) {
	if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
		cb(null, true);
	}
	else {
		cb(null, false);
	}
};
const upload = multer({
	storage: storage
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
	fileFilter: fileFilter
});

//Require mongoose model
const Example = require('../models/example-model');



//GET ALL -------------------------------------------------
router.get('/', (req, res, next) => {

	//Example mongoose model
	Example.find()
		//select what you want in the response
		.select('name count _id etc')
		.exec()
		.then(results => {
			const response = {
				//other properties you want to pass along
				count: results.length,
				all: results.map(result => {
					return {
						name: result.name,
						_id: result._id,
						request: {
							type: 'GET',
							url: '<url>' + doc._id
						}
					}
				})
			};
			res.status(200).json(response);
		})
		.catch(err => {
			res.status(500).json{
				error: err
			}
		});
});

//POST ----------------------------------------------------
router.post('/', upload.single('image'), (req, res, next) => {
	//Available from 'upload.single'
	console.log(req.file)
	//Example mongoose model
	const exampleModel = new Example({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name
	});
	exampleModel
		.save()
		.then(results => {
			res.status(201).json({
				message: "Created new entry",
				newObject: {
					name: results.name,
					_id: results._id,
					request: {
						type: 'GET',
						url: '<url>' + results._id
					}
				}
			});
		})
		.catch(err => {
			res.status(500).json({
				error: err
			})
		});
});

//GET -----------------------------------------------------
router.get('/:id', (req, res, next) => {

	//Example mongoose model
	const id = req.params.id
	Example.findById(id)
		.select('name _id')
		.exec()
		.then(results => {
			res.status(200).json({
				name: results.name,
				_id: results._id,
				request: {
					type: 'GET',
					url: '<url>' + results._id
				}
			});
		})
		.catch(err => {
			res.status(500).json({error: err});
		});
});

//PATCH ---------------------------------------------------
router.patch('/:id', (req, res, next) => {
	const id = req.params.id;
	const updateOps = {};
	for(let ops in req.body){
		updateOps[ops.propName] = ops.value;
	}
	Example.update({_id: id}, { $set: updateOps })
		.exec()
		.then(results => {
			res.status(200).json({
				message: 'Object updated',
				request: {
					type: 'GET',
					url: '<url>' + id
				}
			})
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});
});

//DELETE --------------------------------------------------
router.delete('/:id', (req, res, next) => {
	
	//Example mongoose model
	const id = req.params.id;
	Example.remove({_id: id})
		exec()
		.then(results => {
			res.status(200).json({
				message: 'Object Deleted',
				request: {
					type: 'POST',
					url: '<url>',
					body: {name: 'String'}
				}
			})
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});
});

module.exports = router;







