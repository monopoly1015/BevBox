document.addEventListener('DOMContentLoaded', function() {
    // Slideshow functionality
    const imageFiles = [
        "photo1.jpg",
        "photo2.jpg",
        "photo3.jpg"
    ];

    // Shuffle array function
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    // Initialize slideshow
    const slidesContainer = document.querySelector('.slides');
    if (slidesContainer) {
        const shuffledImages = shuffleArray(imageFiles);
        slidesContainer.innerHTML = '';

        // Create slides
        shuffledImages.forEach((imageFile, index) => {
            const slide = document.createElement('div');
            slide.classList.add('slide');
            slide.style.display = index === 0 ? 'block' : 'none';

            const img = document.createElement('img');
            img.src = `assets/images/${imageFile}`;
            img.alt = `Event Image ${index + 1}`;
            img.loading = "lazy";
            img.style.display = 'block';
            img.style.margin = '0 auto';
            img.style.maxHeight = '500px';
            img.style.width = 'auto';
            slide.appendChild(img);
            slidesContainer.appendChild(slide);
        });

        // Slideshow controls
        const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;
        const totalSlides = slides.length;
        let slideInterval;

        function showSlide(index) {
            slides.forEach(slide => {
                slide.style.display = 'none';
            });
            slides[index].style.display = 'block';
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }

        function startSlideShow() {
            slideInterval = setInterval(nextSlide, 5000);
        }

        // Initial setup
        showSlide(currentSlide);
        startSlideShow();

        // Pause on hover
        slidesContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        slidesContainer.addEventListener('mouseleave', startSlideShow);

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
