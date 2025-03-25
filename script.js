document.addEventListener('DOMContentLoaded', function() {
    // Slideshow configuration
    const slides = [
        { type: 'image', src: 'photo1.jpg', alt: 'Event setup' },
        { type: 'image', src: 'photo2.jpg', alt: 'Bar service' },
        { type: 'video', src: 'promo.mp4', alt: 'Company promo', hasSound: true }, // Added sound flag
        { type: 'image', src: 'photo3.jpg', alt: 'Happy guests' }
    ];

    // DOM elements
    const slidesContainer = document.querySelector('.slides');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    let interval;

    // Create slides
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
                // Enhanced video HTML with sound controls and accessibility
                slideEl.innerHTML = `
                    <div class="video-container">
                        <video ${slide.hasSound ? 'controls' : 'muted'} loop playsinline webkit-playsinline
                            aria-label="${slide.alt}" ${!slide.hasSound ? 'aria-muted="true"' : ''}>
                            <source src="assets/videos/${slide.src}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        ${slide.hasSound ? '<div class="sound-notice">Video contains sound</div>' : ''}
                    </div>
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
        slideElements.forEach((slide, i) => {
            slide.classList.remove('active');
            slide.setAttribute('aria-hidden', 'true');
            const video = slide.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0;
                // Remove any existing play buttons
                const existingBtn = slide.querySelector('.video-play-btn');
                if (existingBtn) existingBtn.remove();
            }
        });
        
        // Show current slide
        slideElements[index].classList.add('active');
        slideElements[index].setAttribute('aria-hidden', 'false');
        const video = slideElements[index].querySelector('video');
        
        // Handle video playback
        if (video) {
            const playPromise = video.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    if (error.name === 'NotAllowedError') {
                        // Show play button when autoplay is blocked
                        const playBtn = document.createElement('button');
                        playBtn.className = 'video-play-btn';
                        playBtn.innerHTML = '▶ Play Video';
                        playBtn.setAttribute('aria-label', 'Play video');
                        playBtn.onclick = () => {
                            video.play()
                                .then(() => playBtn.remove())
                                .catch(e => console.log('Playback failed:', e));
                        };
                        video.parentNode.appendChild(playBtn);
                    }
                });
            }
        }
    }

    // Start slideshow timer
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

    // Navigation controls with keyboard accessibility
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
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });

    // Pause on hover/focus for better UX
    slidesContainer.addEventListener('mouseenter', () => clearInterval(interval));
    slidesContainer.addEventListener('mouseleave', startSlideshow);
    slidesContainer.addEventListener('focusin', () => clearInterval(interval));
    slidesContainer.addEventListener('focusout', startSlideshow);
});
