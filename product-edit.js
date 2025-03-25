document.addEventListener('DOMContentLoaded', function() {
    const CORRECT_PASSWORD = "TheLongIslandPartyCompany2025";
    const editLock = document.getElementById('editLock');
    const editModal = document.getElementById('editModal');

    if (!editLock || !editModal) {
        console.error('Edit elements not found');
        return;
    }

    const closeModal = editModal.querySelector('.close-modal');
    const saveButton = document.getElementById('saveEdit');
    const passwordInput = document.getElementById('editPassword');
    const errorMessage = document.getElementById('editError');
    const descriptionElement = document.getElementById('product-description');
    const editTextarea = document.getElementById('editTextarea');

    // Load saved description
    const productId = window.location.pathname.split('/').pop().split('.')[0];
    const savedDesc = localStorage.getItem(`product-desc-${productId}`);
    if (savedDesc && descriptionElement) {
        descriptionElement.innerHTML = savedDesc;
    }

    // Edit lock button
    editLock.addEventListener('click', function(e) {
        e.preventDefault();
        editModal.style.display = 'flex';
        if (editTextarea && descriptionElement) {
            editTextarea.value = descriptionElement.textContent;
        }
        if (passwordInput) passwordInput.value = '';
        if (errorMessage) errorMessage.textContent = '';
    });

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            editModal.style.display = 'none';
        });
    }

    // Save changes
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            if (!passwordInput || !editTextarea || !descriptionElement || !errorMessage) return;
            
            if (passwordInput.value !== CORRECT_PASSWORD) {
                errorMessage.textContent = 'Incorrect password';
                return;
            }
            
            const newDesc = editTextarea.value.trim();
            if (!newDesc) {
                errorMessage.textContent = 'Description cannot be empty';
                return;
            }
            
            localStorage.setItem(`product-desc-${productId}`, newDesc);
            descriptionElement.innerHTML = newDesc;
            editModal.style.display = 'none';
        });
    }

    // Close when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === editModal) {
            editModal.style.display = 'none';
        }
    });
});
