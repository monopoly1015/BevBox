document.addEventListener('DOMContentLoaded', function() {
    // Slideshow items (now including videos)
    const slideshowItems = [
        { type: 'image', src: 'photo1.jpg' },
        { type: 'image', src: 'photo2.jpg' },
        { type: 'image', src: 'photo3.jpg' },
        { type: 'video', src: 'promo.mp4' } // Add your video
    ];

    // Initialize slideshow
    const slidesContainer = document.querySelector('.slides');
    if (slidesContainer) {
        // Clear existing content
        slidesContainer.innerHTML = '';

        // Create slides
        slideshowItems.forEach((item, index) => {
            const slide = document.createElement('div');
            slide.classList.add('slide');
            if (index === 0) slide.classList.add('active');

            if (item.type === 'image') {
                const img = document.createElement('img');
                img.src = `assets/images/${item.src}`;
                img.alt = `Event Image ${index + 1}`;
                img.loading = "lazy";
                img.style.maxHeight = '100%';
                img.style.width = 'auto';
                slide.appendChild(img);
            } else if (item.type === 'video') {
                const video = document.createElement('video');
                video.autoplay = true;
                video.muted = true;
                video.loop = true;
                video.playsinline = true;
                
                const source = document.createElement('source');
                source.src = `assets/videos/${item.src}`;
                source.type = 'video/mp4';
                
                video.appendChild(source);
                video.appendChild(document.createTextNode('Your browser does not support HTML5 video.'));
                slide.appendChild(video);
                slide.classList.add('video-slide');
            }

            slidesContainer.appendChild(slide);
        });

        // Slideshow controls
        const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;
        const totalSlides = slides.length;
        let slideInterval;

        function showSlide(index) {
            slides.forEach(slide => {
                slide.classList.remove('active');
                // Pause any videos when not active
                const video = slide.querySelector('video');
                if (video) video.pause();
            });
            
            slides[index].classList.add('active');
            // Play video if this slide has one
            const video = slides[index].querySelector('video');
            if (video) video.play();
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }

        function startSlideShow() {
            slideInterval = setInterval(nextSlide, 5000); // 5s interval
        }

        // Initial setup
        showSlide(currentSlide);
        startSlideShow();

        // Pause on hover
        slidesContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
            const video = slides[currentSlide].querySelector('video');
            if (video) video.pause();
        });

        slidesContainer.addEventListener('mouseleave', () => {
            startSlideShow();
            const video = slides[currentSlide].querySelector('video');
            if (video) video.play();
        });

        // Navigation arrows
        document.querySelector('.arrow.next')?.addEventListener('click', () => {
            clearInterval(slideInterval);
            nextSlide();
            startSlideShow();
        });

        document.querySelector('.arrow.prev')?.addEventListener('click', function() {
            clearInterval(slideInterval);
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
            startSlideShow();
        });
    }
});
