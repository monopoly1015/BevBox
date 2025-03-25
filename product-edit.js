document.addEventListener('DOMContentLoaded', function() {
    const PASSWORD = "TheLongIslandPartyCompany2025";
    const elements = {
        lock: document.getElementById('editLock'),
        modal: document.getElementById('editModal'),
        close: document.querySelector('.close-modal'),
        save: document.getElementById('saveEdit'),
        input: document.getElementById('editPassword'),
        error: document.getElementById('editError'),
        desc: document.getElementById('product-description'),
        textarea: document.getElementById('editTextarea')
    };

    // Debugging
    console.log('Edit system elements:', elements);
    if (!elements.lock) return console.error('Edit lock not found');

    // Load saved description
    const productId = window.location.pathname.split('/').pop().split('.')[0];
    const savedDesc = localStorage.getItem(`product-desc-${productId}`);
    if (savedDesc && elements.desc) {
        elements.desc.innerHTML = savedDesc;
    }

    // Lock click handler
    elements.lock.addEventListener('click', function(e) {
        e.preventDefault();
        elements.modal.style.display = 'flex';
        if (elements.textarea && elements.desc) {
            elements.textarea.value = elements.desc.textContent;
        }
    });

    // Close modal
    elements.close.addEventListener('click', () => {
        elements.modal.style.display = 'none';
    });

    // Save handler
    elements.save.addEventListener('click', () => {
        if (!elements.input || !elements.textarea) return;
        
        if (elements.input.value !== PASSWORD) {
            if (elements.error) elements.error.textContent = 'Incorrect password';
            return;
        }
        
        const newDesc = elements.textarea.value.trim();
        if (!newDesc) {
            if (elements.error) elements.error.textContent = 'Description required';
            return;
        }
        
        localStorage.setItem(`product-desc-${productId}`, newDesc);
        if (elements.desc) elements.desc.innerHTML = newDesc;
        elements.modal.style.display = 'none';
    });

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === elements.modal) {
            elements.modal.style.display = 'none';
        }
    });
});
