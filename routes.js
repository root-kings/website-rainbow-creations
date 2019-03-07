/* eslint-disable new-cap */
/* eslint-disable capitalized-comments */
let router = require('express').Router()

router.get('/', (req, res) => {
	res.render('index')
})

router.get('/story', (req, res) => {
	res.render('story')
})

router.get('/products', (req, res) => {
	res.render('products')
})

router.get('/services', (req, res) => {
	res.render('services')
})

router.get('/portfolio', (req, res) => {
	res.render('portfolio')
})

router.get('/events', (req, res) => {
	res.render('events')
})

router.get('/contact', (req, res) => {
	res.render('contact')
})

// Controllers -----

module.exports = router