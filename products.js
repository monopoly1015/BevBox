document.addEventListener('DOMContentLoaded', function() {
    // Password
    const CORRECT_PASSWORD = "TheLongIslandPartyCompany2025";
    
    // DOM Elements
    const editLock = document.getElementById('editLock');
    const editModal = document.getElementById('editModal');
    const closeModal = document.querySelector('.close-modal');
    const saveButton = document.getElementById('saveEdit');
    const passwordInput = document.getElementById('editPassword');
    const errorMessage = document.getElementById('editError');
    
    let currentEditingProduct = null;
    
    // Load saved descriptions from localStorage
    document.querySelectorAll('.product-card').forEach(card => {
        const productId = card.dataset.product;
        const savedDesc = localStorage.getItem(`product-desc-${productId}`);
        if (savedDesc) {
            card.querySelector('.description').innerHTML = savedDesc;
        }
    });
    
    // Lock icon click handler
    editLock.addEventListener('click', function() {
        editModal.style.display = 'flex';
        document.getElementById('editTextarea').value = '';
        passwordInput.value = '';
        errorMessage.textContent = '';
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        editModal.style.display = 'none';
    });
    
    // Product card click handler (when in edit mode)
    document.addEventListener('click', function(e) {
        if (editModal.style.display === 'flex' && e.target.closest('.product-card')) {
            const productCard = e.target.closest('.product-card');
            currentEditingProduct = productCard.dataset.product;
            const currentDesc = productCard.querySelector('.description').textContent;
            document.getElementById('editTextarea').value = currentDesc;
        }
    });
    
    // Save changes
    saveButton.addEventListener('click', function() {
        if (passwordInput.value !== CORRECT_PASSWORD) {
            errorMessage.textContent = 'Incorrect password';
            return;
        }
        
        if (!currentEditingProduct) {
            errorMessage.textContent = 'Please click on a product first';
            return;
        }
        
        const newDesc = document.getElementById('editTextarea').value.trim();
        if (!newDesc) {
            errorMessage.textContent = 'Description cannot be empty';
            return;
        }
        
        // Save to localStorage
        localStorage.setItem(`product-desc-${currentEditingProduct}`, newDesc);
        
        // Update the display
        document.querySelector(`[data-product="${currentEditingProduct}"] .description`).innerHTML = newDesc;
        
        // Close modal
        editModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === editModal) {
            editModal.style.display = 'none';
        }
    });
});
