// Array of image file names in the assets/images folder
const imageFiles = [
    "photo1.jpg",
    "photo2.jpg",
    "photo3.jpg",
    //"photo4.jpg",
    //"photo5.jpg",
    //"photo6.jpg",
    // Add more image file names here
];

// Function to shuffle the array (randomize image order)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Shuffle the image files
const shuffledImages = shuffleArray(imageFiles);

// Get the slides container
const slidesContainer = document.querySelector('.slides');

// Add images to the slideshow
shuffledImages.forEach((imageFile, index) => {
    const slide = document.createElement('div');
    slide.classList.add('slide');
    if (index === 0) slide.classList.add('active'); // Show the first slide initially

    const img = document.createElement('img');
    img.src = `assets/images/${imageFile}`;
    img.alt = `BevBox Image ${index + 1}`;

    slide.appendChild(img);
    slidesContainer.appendChild(slide);
});

// Slideshow functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Show the current slide
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides; // Loop back to the first slide
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; // Loop to the last slide
    showSlide(currentSlide);
}

// Automatically change slides every 12 seconds
setInterval(nextSlide, 12000);

// Manual navigation with arrows
document.querySelector('.arrow.next').addEventListener('click', nextSlide);
document.querySelector('.arrow.prev').addEventListener('click', prevSlide);
