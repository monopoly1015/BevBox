document.addEventListener('DOMContentLoaded', function() {
    // Remove this entire preload section - it's causing conflicts
    // const basePath = window.location.origin;
    // const images = [
    //     `${basePath}/assets/images/barphoto1.jpg`,
    //     `${basePath}/assets/images/tvphoto.jpg`
    // ];
    // images.forEach(src => {
    //     const img = new Image();
    //     img.src = src;
    //     img.onerror = () => console.error('Failed to preload:', src);
    // });

    // Enhanced error handling
    document.querySelectorAll('.product-image-container img').forEach(img => {
        img.onerror = function() {
            console.error('Failed to load:', this.src);
            this.style.display = 'none';
            
            // Create visual error indicator
            const errorDiv = document.createElement('div');
            errorDiv.innerHTML = `
                <div style="color:red; border:2px dashed red; padding:10px;">
                    Image failed to load<br>
                    Tried: ${this.src.split('/').pop()}
                </div>
            `;
            this.parentElement.appendChild(errorDiv);
            
            // Try direct GitHub raw path as last resort
            const ghPath = `https://raw.githubusercontent.com/YOURUSERNAME/YOURREPO/main${this.src}`;
            console.log('Attempting GitHub raw path:', ghPath);
            
            const testImg = new Image();
            testImg.onload = function() {
                img.src = ghPath;
                img.style.display = 'block';
                errorDiv.remove();
            };
            testImg.src = ghPath;
        };
    });
});
