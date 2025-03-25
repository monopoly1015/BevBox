document.addEventListener('DOMContentLoaded', function() {
    // Slideshow functionality
    const imageFiles = [
        "photo1.jpg",
        "photo2.jpg",
        "photo3.jpg"
    ];

    // Shuffle array function
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Initialize slideshow
    const slidesContainer = document.querySelector('.slides');
    if (slidesContainer) {
        const shuffledImages = shuffleArray([...imageFiles]);
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
            slide.appendChild(img);
            slidesContainer.appendChild(slide);
        });

        // Slideshow controls
        const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;
        const totalSlides = slides.length;

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

        // Auto-advance and controls
        let slideInterval = setInterval(nextSlide, 5000);

        // Pause on hover
        slidesContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        slidesContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });

        // Navigation arrows
        document.querySelector('.arrow.next')?.addEventListener('click', nextSlide);
        document.querySelector('.arrow.prev')?.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        });
    }
});
