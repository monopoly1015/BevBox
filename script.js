document.addEventListener('DOMContentLoaded', function() {
    // Slideshow configuration
    const slides = [
        { type: 'video', src: 'promo.mp4', alt: 'Beer Pouring...' },
        { type: 'image', src: 'photo3.jpg', alt: 'Beer Pouring...' },
        { type: 'image', src: 'bar-in-use.jpg', alt: 'Beer Pouring...' },
        { type: 'image', src: 'bar-in-use2.JPG', alt: 'BevBar' }
    ];

    // DOM elements
    const slidesContainer = document.querySelector('.slides');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    let interval;

    // Create slides with autoplaying muted video
    function initializeSlides() {
        slides.forEach((slide) => {
            const slideEl = document.createElement('div');
            slideEl.className = 'slide';
            
            if (slide.type === 'image') {
                slideEl.innerHTML = `
                    <img src="assets/images/${slide.src}" alt="${slide.alt}" loading="lazy">
                `;
            } else {
                // Video slide (autoplay muted, no controls)
                slideEl.innerHTML = `
                    <video autoplay muted loop playsinline
                           aria-label="${slide.alt}">
                        <source src="assets/videos/${slide.src}" type="video/mp4">
                    </video>
                `;
                slideEl.classList.add('video-slide');
            }
            
            slidesContainer.appendChild(slideEl);
        });
    }

    // Show specific slide
    function showSlide(index) {
        const slideElements = document.querySelectorAll('.slide');
        
        // Hide all slides
        slideElements.forEach(slide => {
            slide.classList.remove('active');
            const video = slide.querySelector('video');
            if (video) {
                video.pause();
            }
        });
        
        // Show current slide
        slideElements[index].classList.add('active');
        const video = slideElements[index].querySelector('video');
        
        // Autoplay current video (muted)
        if (video) {
            video.currentTime = 0;
            video.play().catch(e => console.log('Autoplay prevented:', e));
        }
    }

    // Initialize slideshow
    initializeSlides();
    showSlide(0);

    // Navigation controls
    function navigate(direction) {
        clearInterval(interval);
        currentIndex = (currentIndex + direction + slides.length) % slides.length;
        showSlide(currentIndex);
        startSlideshow();
    }

    prevBtn.addEventListener('click', () => navigate(-1));
    nextBtn.addEventListener('click', () => navigate(1));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
    });

    // Slideshow timing
    function startSlideshow() {
        clearInterval(interval);
        interval = setInterval(() => navigate(1), 5000);
    }
    startSlideshow();

    // Pause on hover
    slidesContainer.addEventListener('mouseenter', () => clearInterval(interval));
    slidesContainer.addEventListener('mouseleave', startSlideshow);
});
