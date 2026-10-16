window.HELP_IMPROVE_VIDEOJS = false;


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    bulmaSlider.attach();

    // Load and play videos only when they approach the viewport. This avoids
    // downloading and decoding every demo during the initial page load.
    const lazyVideos = document.querySelectorAll('video.lazy-video');
    const activateVideo = video => {
      if (video.dataset.loaded === 'true') return;
      video.querySelectorAll('source[data-src]').forEach(source => {
        source.src = source.dataset.src;
        source.removeAttribute('data-src');
      });
      video.dataset.loaded = 'true';
      video.load();
    };

    if ('IntersectionObserver' in window) {
      const videoObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const video = entry.target;
          if (entry.isIntersecting) {
            activateVideo(video);
            const playPromise = video.play();
            if (playPromise) playPromise.catch(() => {});
          } else if (video.dataset.loaded === 'true') {
            video.pause();
          }
        });
      }, { rootMargin: '400px 0px', threshold: 0.05 });

      lazyVideos.forEach(video => videoObserver.observe(video));
    } else {
      lazyVideos.forEach(activateVideo);
    }

})

