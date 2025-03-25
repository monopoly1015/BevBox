document.addEventListener('DOMContentLoaded', function() {
    // Array of image file names
    const imageFiles = [
        "photo1.jpg",
        "photo2.jpg",
        "photo3.jpg"
    ];

    // Shuffle function
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Initialize slideshow
    const shuffledImages = shuffleArray([...imageFiles]); // Create a copy
    const slidesContainer = document.querySelector('.slides');
    slidesContainer.innerHTML = ''; // Clear any existing slides

    // Create slides
    shuffledImages.forEach((imageFile, index) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        
        const img = document.createElement('img');
        img.src = `assets/images/${imageFile}`;
        img.alt = `Event Photo ${index + 1}`;
        
        slide.appendChild(img);
        slidesContainer.appendChild(slide);
    });

    // Slideshow functionality
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    slides[currentSlide].classList.add('active');

    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-advance
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    slidesContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slidesContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Navigation arrows
    document.querySelector('.arrow.next')?.addEventListener('click', nextSlide);
    document.querySelector('.arrow.prev')?.addEventListener('click', prevSlide);
});
