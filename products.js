document.addEventListener('DOMContentLoaded', function() {
    // Enhanced error handling for product images
    function handleImageError(img) {
        console.error('Image failed to load:', img.src);
        
        // Create error message
        const errorMsg = document.createElement('div');
        errorMsg.className = 'image-error';
        errorMsg.innerHTML = `
            Failed to load: ${img.dataset.filename}<br>
            Trying fallback solutions...
        `;
        img.parentElement.appendChild(errorMsg);
        
        // Try alternative paths
        const alternatives = [
            `/assets/images/${img.dataset.filename}`,  // Root-relative
            `assets/images/${img.dataset.filename}`,   // Relative
            `images/${img.dataset.filename}`,         // Shorter relative
            `/${img.dataset.filename}`,               // Root attempt
            `https://raw.githubusercontent.com/YOURUSERNAME/YOURREPO/main/assets/images/${img.dataset.filename}`
        ];
        
        attemptFallbackLoad(img, alternatives, errorMsg);
    }

    function attemptFallbackLoad(img, paths, errorMsg) {
        if (paths.length === 0) return;
        
        const currentPath = paths.shift();
        console.log('Trying path:', currentPath);
        
        const testImg = new Image();
        testImg.onload = function() {
            img.src = currentPath;
            errorMsg.textContent = `Success! Loaded from: ${currentPath}`;
            errorMsg.style.color = 'green';
            errorMsg.style.borderColor = 'green';
            console.log('Loaded successfully from:', currentPath);
        };
        testImg.onerror = function() {
            console.warn('Failed path:', currentPath);
            setTimeout(() => attemptFallbackLoad(img, paths, errorMsg), 500);
        };
        testImg.src = currentPath;
    }

    // Initialize image error handlers
    document.querySelectorAll('.product-image-container img').forEach(img => {
        // Add cache busting
        img.src = img.src + '?v=' + Date.now();
        
        // Set up error handler
        img.onerror = function() {
            handleImageError(this);
        };
        
        // Check if already errored
        if (!img.complete || img.naturalWidth === 0) {
            img.dispatchEvent(new Event('error'));
        }
    });
});
