/* eslint-disable new-cap */
/* eslint-disable capitalized-comments */
let router = require('express').Router()

router.get('/', (req, res) => {
	res.render('index')
})

router.get('/splash', (req, res) => {
	res.render('splash')
})

router.get('/products', (req, res) => {
	res.render('products')
})

router.get('/services', (req, res) => {
	res.render('services')
})

// router.get('/portfolio', (req, res) => {
// 	res.render('portfolio')
// })

router.get('/artwork', (req, res) => {
	res.render('artwork')
})

router.get('/events', (req, res) => {
	res.render('events')
})

router.get('/testimonials', (req, res) => {
	res.render('testimonials')
})

router.get('/contact', (req, res) => {
	res.render('contact')
})

router.get('/dashboard', (req, res) => {
	res.render('dashboard')
})

router.get('/login', (req, res) => {
	res.render('login')
})

// Controllers -----

var project_controller = require('./controllers/projectController')

/// PROJECT ROUTES ///

// GET request for creating project.
router.get('/project/create', project_controller.project_edit)

// POST request for creating project.
router.post('/project/create', project_controller.project_create_post)

// POST request to delete project.
router.post('/project/:id/delete', project_controller.project_delete_post)

// POST request to update project.
router.post('/project/:id/update', project_controller.project_update_post)

// GET request for one project.
router.get('/project/:id', project_controller.project_detail)

// GET request for list of all project.
router.get('/dashboard/projects', project_controller.project_edit)

router.get('/portfolio', project_controller.project_list)

// GET request for one project image.
router.get('/project/image/:id', project_controller.project_image_get)

router.get('/api/projects', project_controller.project_list_api)

router.get('/api/project/sign-s3/put', project_controller.project_sign_s3_put_get)

router.get('/api/project/image/delete', project_controller.project_s3_delete_get)

module.exports = router
