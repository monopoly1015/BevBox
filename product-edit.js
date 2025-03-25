document.addEventListener('DOMContentLoaded', function() {
    const PASSWORD = "TheLongIslandPartyCompany2025"; // Change this to your desired password
    const editLock = document.getElementById('editLock');
    const editModal = document.getElementById('editModal');
    const description = document.getElementById('product-description');

    if (!editLock || !editModal || !description) return;

    // Initialize from localStorage
    const productId = window.location.pathname.split('/').pop().split('.')[0];
    const savedDesc = localStorage.getItem(`product-desc-${productId}`);
    if (savedDesc) description.innerHTML = savedDesc;

    // Lock icon click: Show modal
    editLock.addEventListener('click', () => {
        editModal.style.display = 'flex';
        document.getElementById('editTextarea').value = description.textContent;
    });

    // Modal controls
    document.querySelector('.close-modal').addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    document.getElementById('saveEdit').addEventListener('click', function() {
        const password = document.getElementById('editPassword').value;
        const newText = document.getElementById('editTextarea').value.trim();
        const errorEl = document.getElementById('editError');

        if (password !== PASSWORD) {
            errorEl.textContent = 'Incorrect password';
            return;
        }

        if (!newText) {
            errorEl.textContent = 'Description cannot be empty';
            return;
        }

        // Save changes
        description.innerHTML = newText;
        localStorage.setItem(`product-desc-${productId}`, newText);
        editModal.style.display = 'none';
        errorEl.textContent = '';
    });
});
