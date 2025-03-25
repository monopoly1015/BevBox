document.addEventListener('DOMContentLoaded', function() {
    // Preload images
    const images = [
        '/assets/images/12ft-bar-product.jpg',
        '/assets/images/tv-product.jpg'
    ];

    images.forEach(src => {
        new Image().src = src;
    });

    // Verify image loading
    document.querySelectorAll('.product-image-container img').forEach(img => {
        img.onerror = function() {
            console.error('Failed to load image:', this.src);
            this.style.display = 'none';
            this.parentElement.style.background = `url('/assets/images/image-placeholder.svg') center/contain no-repeat`;
        };
    });
});
