document.addEventListener('DOMContentLoaded', function() {
    // Slideshow configuration
    const slides = [
        { type: 'image', src: 'photo1.jpg', alt: 'Event setup' },
        { type: 'image', src: 'photo2.jpg', alt: 'Bar service' },
        { type: 'video', src: 'promo.mp4', alt: 'Company promo', hasSound: true },
        { type: 'image', src: 'photo3.jpg', alt: 'Happy guests' }
    ];

    // DOM elements
    const slidesContainer = document.querySelector('.slides');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    let interval;

    // Create slides with manual video control
    function initializeSlides() {
        slides.forEach((slide, index) => {
            const slideEl = document.createElement('div');
            slideEl.className = 'slide';
            
            if (slide.type === 'image') {
                slideEl.innerHTML = `
                    <img src="assets/images/${slide.src}" alt="${slide.alt}" loading="lazy">
                `;
            } else {
                // Video slide with manual controls
                slideEl.innerHTML = `
                    <div class="video-container">
                        <video loop playsinline
                               aria-label="${slide.alt}">
                            <source src="assets/videos/${slide.src}" type="video/mp4">
                        </video>
                        <button class="video-play-btn">▶ Play Video</button>
                    </div>
                `;
                slideEl.classList.add('video-slide');
            }
            
            slidesContainer.appendChild(slideEl);
        });

        // Setup video play buttons
        document.querySelectorAll('.video-play-btn').forEach(btn => {
            const video = btn.parentElement.querySelector('video');
            btn.addEventListener('click', () => {
                video.play().then(() => {
                    btn.style.display = 'none';
                    video.setAttribute('controls', ''); // Show native controls
                }).catch(e => {
                    console.log('Playback failed:', e);
                });
            });
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
                video.currentTime = 0;
                video.removeAttribute('controls');
                const playBtn = slide.querySelector('.video-play-btn');
                if (playBtn) playBtn.style.display = 'block';
            }
        });
        
        // Show current slide
        slideElements[index].classList.add('active');
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

    // Slideshow timing (without autoplay)
    function startSlideshow() {
        clearInterval(interval);
        interval = setInterval(() => navigate(1), 5000);
    }
    startSlideshow();

    // Pause on hover
    slidesContainer.addEventListener('mouseenter', () => clearInterval(interval));
    slidesContainer.addEventListener('mouseleave', startSlideshow);
});
