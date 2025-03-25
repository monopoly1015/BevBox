document.addEventListener('DOMContentLoaded', function() {
    // Simple image error handling without success messages
    document.querySelectorAll('.product-image-container img').forEach(img => {
        img.onerror = function() {
            console.error('Image failed to load:', this.src);
            this.style.display = 'none';
            
            // Create placeholder (without success message)
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.innerHTML = `
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100" height="100" fill="#f5f5f5"/>
                    <text x="50" y="50" font-family="Arial" text-anchor="middle" fill="#ccc">Image not available</text>
                </svg>
            `;
            this.parentElement.appendChild(placeholder);
        };
        
        // Add cache busting
        img.src = img.src + '?v=' + Date.now();
    });
});
