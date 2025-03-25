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
            slideEl.setAttribute('aria-hidden', 'true');
            slideEl.setAttribute('role', 'group');
            slideEl.setAttribute('aria-label', `${index + 1} of ${slides.length}`);
            
            if (slide.type === 'image') {
                slideEl.innerHTML = `
                    <img src="assets/images/${slide.src}" alt="${slide.alt}" loading="lazy">
                `;
            } else {
                // Video slide with full controls
                slideEl.innerHTML = `
                    <div class="video-container">
                        <video controls loop playsinline
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
                video.play();
                btn.style.display = 'none';
            });
        });
    }

    // Show specific slide
    function showSlide(index) {
        const slideElements = document.querySelectorAll('.slide');
        
        // Hide all slides
        slideElements.forEach(slide => {
            slide.classList.remove('active');
            slide.setAttribute('aria-hidden', 'true');
            const video = slide.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0;
                // Show play button again
                const playBtn = slide.querySelector('.video-play-btn');
                if (playBtn) playBtn.style.display = 'block';
            }
        });
        
        // Show current slide
        slideElements[index].classList.add('active');
        slideElements[index].setAttribute('aria-hidden', 'false');
    }

    // Start slideshow timer (without autoplay)
    function startSlideshow() {
        clearInterval(interval);
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }, 5000);
    }

    // Initialize slideshow
    initializeSlides();
    showSlide(0);
    startSlideshow();

    // Navigation controls
    prevBtn.addEventListener('click', () => {
        clearInterval(interval);
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
        startSlideshow();
    });

    nextBtn.addEventListener('click', () => {
        clearInterval(interval);
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
        startSlideshow();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    });

    // Pause on hover
    slidesContainer.addEventListener('mouseenter', () => clearInterval(interval));
    slidesContainer.addEventListener('mouseleave', startSlideshow);
});
