document.addEventListener('DOMContentLoaded', function() {
    // Preload product images
    function preloadImages() {
        const images = [
            'assets/images/12ft-bar-product.jpg',
            'assets/images/tv-product.jpg'
        ];
        
        images.forEach(src => {
            new Image().src = src;
        });
    }

    // Initialize
    preloadImages();

    // Product card interaction
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('img').style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = '';
        });
    });
});
