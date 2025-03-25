document.addEventListener('DOMContentLoaded', function() {
    // Preload images
    const imageUrls = [
        '/assets/images/12ft-bar-product.jpg',
        '/assets/images/tv-product.jpg'
    ];

    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
        img.onerror = () => console.error('Failed to load:', url);
    });

    // Debugging
    document.querySelectorAll('.product-image-container img').forEach(img => {
        img.onerror = () => {
            console.error('Broken image:', img.src);
            img.parentElement.style.backgroundColor = 'rgba(255,0,0,0.1)';
        };
    });
});
