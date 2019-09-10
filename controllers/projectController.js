/* eslint-env node */

const aws = require('aws-sdk')
const S3_BUCKET = process.env.S3_BUCKET
aws.config.region = process.env.AWS_REGION

const s3 = new aws.S3()
// -----

var Project = require('../models/project')

// Display list of all Projects.
exports.project_list = function(req, res) {
	Project.find({ type: req.params.type }).exec(function(err, list_projects) {
		if (err) {
			throw err
		}

		let artworktype = req.params.type.split('-').join(' ')
		
		if (req.params.type == 'gift') artworktype = 'personalized gift'

		if (req.params.type != 'wall-art') artworktype += 's'

		console.log(list_projects)
		//Successful, so render
		res.render('artwork', {
			artworktype,
			projects: list_projects
		})
		//res.send(list_projects);
	})
	//res.send('NOT IMPLEMENTED: Project list');
}

exports.project_edit = function(req, res) {
	res.render('edit-projects')
}

exports.project_list_api = function(req, res) {
	Project.find({}).exec(function(err, list_projects) {
		if (err) {
			throw err
		}
		res.send(list_projects)
	})
}

// Display detail page for a specific Project.
exports.project_detail = function(req, res) {
	Project.findById(req.params.id).exec(function(err, project) {
		if (err) {
			throw err
		}

		res.send(project)
	})
}

// Handle Project create on POST.
exports.project_create_post = function(req, res) {
	// Create a Book object with escaped and trimmed data.
	var project = new Project(req.body)

	project.save(function(err) {
		if (err) {
			throw err
		}

		res.send(project)
	})
}

// Handle Project delete on POST.
exports.project_delete_post = function(req, res) {
	Project.findById(req.params.id, function(err, data) {
		var params = {
			Bucket: S3_BUCKET,
			Delete: {
				Objects: []
			}
		}

		// console.log(data)

		data.images.forEach(image => {
			params.Delete.Objects.push({ Key: image.split('/').slice(-1)[0] })
		})

		s3.deleteObjects(params, function(err, data) {
			// console.log(data)

			if (err) return res.status(500).send(err)
		})

		Project.findByIdAndRemove(req.params.id, function(err) {
			if (err) return res.status(500).send(err)
			return res.send(true)
		})
	})

	// res.send('NOT IMPLEMENTED: Project delete POST');
}

// Handle Project update on POST.
exports.project_update_post = function(req, res) {
	// Create a Book object with escaped and trimmed data.
	var project = new Project(req.body)

	Project.findByIdAndUpdate(req.params.id, project, {}, function(err) {
		if (err) {
			throw err
		}
		//successful - redirect to new book record.
		// res.redirect('/dashboard/projects')
		res.send(project)
	})
}

// Display detail image for a specific Enquiry.
exports.project_image_get = function(req, res) {
	Project.findById(req.params.id).exec(function(err, project) {
		if (err) {
			throw err
		}

		res.contentType(project.image.contentType)
		res.send(project.image.data)

		//res.send(list_products);
	})
	// res.send('NOT IMPLEMENTED: Enquiry detail: ' + req.params.id);
}

exports.project_sign_s3_put_get = (req, res) => {
	const fileName = req.query.fileName
	const fileType = req.query.fileType

	const s3Params = {
		Bucket: S3_BUCKET,
		Key: fileName,
		Expires: 60,
		ContentType: fileType,
		ACL: 'public-read'
	}

	s3.getSignedUrl('putObject', s3Params, (err, data) => {
		if (err) {
			console.error(err)
			return res.status(500).send(err)
		}
		const returnData = {
			signedRequest: data,
			url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
		}
		res.send(JSON.stringify(returnData))
	})
}

exports.project_s3_delete_get = (req, res) => {
	const filenameToRemove = req.query.fileName

	const s3Params = {
		Bucket: S3_BUCKET,
		Key: filenameToRemove
	}

	s3.deleteObject(s3Params, function(err, data) {
		if (err) {
			console.error(err)
			return res.status(500).send(err)
		}
		res.send(true)
	})
}
