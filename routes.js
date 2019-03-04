/* eslint-disable new-cap */
/* eslint-disable capitalized-comments */
let router = require('express').Router()

router.get('/', (req, res) => {
	res.render('index')
})

router.get('/story', (req, res) => {
	res.render('story')
})

router.get('/offerings', (req, res) => {
	res.render('offerings')
})

router.get('/contact', (req, res) => {
	res.render('contact')
})

// Controllers -----

module.exports = router