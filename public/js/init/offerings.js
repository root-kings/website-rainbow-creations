showWait()

document.addEventListener('DOMContentLoaded', function() {
	imagesLoaded('#products', function() {
		var msnry = new Masonry('#products', {
			itemSelector: '.product'
		})
	})

	hideWait()
})
