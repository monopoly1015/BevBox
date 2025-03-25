document.addEventListener('DOMContentLoaded', function() {
    // Preload images with absolute paths
    const basePath = window.location.origin;
    const images = [
        `${basePath}/assets/images/barphoto1.jpg`,
        `${basePath}/assets/images/tvphoto.jpg`
    ];

    images.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onerror = () => console.error('Failed to preload:', src);
    });

    // Fallback for broken images
    document.querySelectorAll('.product-image-container img').forEach(img => {
        img.onerror = function() {
            this.style.display = 'none';
            const placeholderSVG = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23f5f5f5'/><text x='50%' y='50%' font-family='Arial' font-size='12' text-anchor='middle' fill='%23aaa'>Image not available</text></svg>`;
            this.parentElement.style.background = `url("${placeholderSVG}") center/contain no-repeat`;
        };
    });
});
