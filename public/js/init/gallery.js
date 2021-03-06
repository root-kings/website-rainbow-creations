/* eslint-env browser, jquery */

(function ($) {
    $(function () {

        //var sidenav = document.querySelector('.sidenav');
        //sidenavinstance = M.Sidenav.init(sidenav);
        // Navbar
        // $(".button-collapse").sideNav();


        $('.parallax').parallax();


        // var categories = $('nav .categories-container');
        // if (categories.length) {
        //     categories.pushpin({
        //         top: categories.offset().top
        //     });
        //     var $links = categories.find('li');
        //     $links.each(function () {
        //         var $link = $(this);
        //         $link.on('click', function () {
        //             $links.removeClass('active');
        //             $link.addClass('active');
        //             var hash = $link.find('a').first()[0].hash.substr(1);
        //             var $galleryItems = $('.gallery .gallery-item');

        //             $galleryItems.stop().addClass('gallery-filter').fadeIn(100);

        //             if (hash !== 'all') {
        //                 var $galleryFilteredOut = $galleryItems.not('.' + hash).not('.all');
        //                 $galleryFilteredOut.removeClass('gallery-filter').hide();
        //             }

        //             // transition layout
        //             $masonry.masonry({
        //                 transitionDuration: '.3s'
        //             });
        //             // only animate on layout
        //             $masonry.one('layoutComplete', function (event, items) {
        //                 $masonry.masonry({
        //                     transitionDuration: 0
        //                 });
        //             });
        //             setTimeout(function () {

        //                 $masonry.masonry('layout');
        //             }, 1000);
        //         });
        //     });
        // }


        // Home
        // $('.carousel:not(.carousel-slider)').carousel({
        //     dist: 0,
        //     padding: 10
        // });
        // $('.carousel.carousel-slider').carousel({
        //     fullWidth: true,
        //     indicators: true,
        //     onCycleTo: function (el) {
        //         $('.nav-background img').removeClass('active');
        //         $('.nav-background img').eq(el.index()).addClass('active');
        //     }
        // });


        // Masonry Grid
        var $masonryArtwork = $('.gallery');
        $masonryArtwork.masonry({
            // set itemSelector so .grid-sizer is not used in layout
            itemSelector: '.gallery-item',
            // use element for option
            columnWidth: '.gallery-item',
            // no transitions
            transitionDuration: 0
        });
        // layout Masonry after each image loads
        $masonryArtwork.imagesLoaded(function () {
            $masonryArtwork.masonry('layout');
        });

        // var $masonryImages = $('.images-wrapper');
        // $masonryImages.masonry({
        //     // set itemSelector so .grid-sizer is not used in layout
        //     itemSelector: '.artwork-images-item',
        //     // use element for option
        //     columnWidth: '.artwork-images-item',
        //     // no transitions
        //     transitionDuration: 0
        // });
        // // layout Masonry after each image loads
        // $masonryImages.imagesLoaded(function () {
        //     $masonryImages.masonry('layout');
        // });

        $('a.filter').click(function (e) {
            e.preventDefault();
        });



        var onShow = function (el) {
            var carousel = el.find('.carousel.initialized');
            carousel.carousel({
                dist: 0,
                padding: 10
            });
        };
        $('.gallery-expand').galleryExpand({
            onShow: onShow
        });

        $('.blog .gallery-expand').galleryExpand({
            onShow: onShow,
            fillScreen: true,
            inDuration: 500,
        });

    }); // end of document ready
})(jQuery); // end of jQuery name space
