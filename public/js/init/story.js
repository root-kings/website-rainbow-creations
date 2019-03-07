var carouselinstance
document.addEventListener('DOMContentLoaded', function() {
	var carouselelem = document.querySelector('#herocarousel')
	carouselinstance = M.Carousel.init(carouselelem, {
		fullWidth: true,
		indicators: true
	})

	setInterval(function() {
		carouselinstance.next()
	}, 3000)
})
