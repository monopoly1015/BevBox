document.addEventListener('DOMContentLoaded', function() {
    const CORRECT_PASSWORD = "TheLongIslandPartyCompany2025";
    const editLock = document.getElementById('editLock');
    const editModal = document.getElementById('editModal');
    const closeModal = document.querySelector('.close-modal');
    const saveButton = document.getElementById('saveEdit');
    const passwordInput = document.getElementById('editPassword');
    const errorMessage = document.getElementById('editError');
    const descriptionElement = document.getElementById('product-description');

    // Load saved description
    const savedDesc = localStorage.getItem(`product-desc-${window.location.pathname.split('/').pop().split('.')[0]}`);
    if (savedDesc) {
        descriptionElement.innerHTML = savedDesc;
    }

    editLock.addEventListener('click', function() {
        editModal.style.display = 'flex';
        document.getElementById('editTextarea').value = descriptionElement.textContent;
        passwordInput.value = '';
        errorMessage.textContent = '';
    });

    closeModal.addEventListener('click', function() {
        editModal.style.display = 'none';
    });

    saveButton.addEventListener('click', function() {
        if (passwordInput.value !== CORRECT_PASSWORD) {
            errorMessage.textContent = 'Incorrect password';
            return;
        }
        
        const newDesc = document.getElementById('editTextarea').value.trim();
        if (!newDesc) {
            errorMessage.textContent = 'Description cannot be empty';
            return;
        }
        
        localStorage.setItem(`product-desc-${window.location.pathname.split('/').pop().split('.')[0]}`, newDesc);
        descriptionElement.innerHTML = newDesc;
        editModal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === editModal) {
            editModal.style.display = 'none';
        }
    });
});
