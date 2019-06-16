document.addEventListener('DOMContentLoaded', function() {
	// particlesJS.load('particles', '/js/init/particles.json')

	M.Slider.init(document.querySelectorAll('.slider'), {
		// height: 600
	})

	// Masonry Grid
	var $masonry = $('.artmenu')
	$masonry.masonry({
		// set itemSelector so .grid-sizer is not used in layout
		itemSelector: '.artmenuitem',
		// use element for option
		columnWidth: '.artmenuitem',
		// no transitions
		transitionDuration: 0
	})
	// layout Masonry after each image loads
	$masonry.imagesLoaded(function() {
		$masonry.masonry('layout')
	})
	
})
