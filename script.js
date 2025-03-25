document.addEventListener('DOMContentLoaded', function() {
    // Slideshow configuration
    const slides = [
        { type: 'image', src: 'photo1.jpg', alt: 'Event setup' },
        { type: 'image', src: 'photo2.jpg', alt: 'Bar service' },
        { type: 'video', src: 'promo.mp4', alt: 'Company promo' },
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
            
            if (slide.type === 'image') {
                slideEl.innerHTML = `
                    <img src="assets/images/${slide.src}" alt="${slide.alt}" loading="lazy">
                `;
            } else {
                slideEl.innerHTML = `
                    <video muted loop playsinline webkit-playsinline>
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
                video.currentTime = 0;
                // Remove any existing play buttons
                const existingBtn = slide.querySelector('.video-play-btn');
                if (existingBtn) existingBtn.remove();
            }
        });
        
        // Show current slide
        slideElements[index].classList.add('active');
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

    // Pause on hover
    slidesContainer.addEventListener('mouseenter', () => clearInterval(interval));
    slidesContainer.addEventListener('mouseleave', startSlideshow);
});
