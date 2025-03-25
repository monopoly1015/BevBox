document.addEventListener('DOMContentLoaded', function() {
    const PASSWORD = "TheLongIslandPartyCompany2025";
    const editLock = document.getElementById('editLock');
    const editModal = document.getElementById('editModal');
    
    if (!editLock || !editModal) {
        console.error('Edit elements missing');
        return;
    }

    // Create lock icon if missing
    if (!editLock.querySelector('img')) {
        const lockImg = document.createElement('img');
        lockImg.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSJ3aGl0ZSIgZD0iTTI1NiA0OEMxNzcuNiA0OCAxMTIgMTEzLjYgMTEyIDE5MnY0OGgtMTZDODMuMSAyNDAgNjQgMjU5LjEgNjQgMjg4djE2MENYNCA0NjUuNiAxMTAuNCA1MTIgMTY4IDUxMmgxNzZjNTcuNiAwIDEwNC00Ni40IDEwNC0xMDRWMjg4YzAtMjguOS0xOS4xLTQ4LTQ4LTQ4aC0xNnYtNDhjMC03OC40LTY1LjYtMTQ0LTE0NC0xNDR6bTAgMTQ0YzE3LjcgMCAzMiAxNC4zIDMyIDMydjQ4aC02NHYtNDhjMC0xNy43IDE0LjMtMzIgMzItMzJ6Ii8+PC9zdmc+';
        lockImg.alt = 'Edit';
        lockImg.style.width = '30px';
        lockImg.style.height = '30px';
        editLock.appendChild(lockImg);
    }

    const modal = {
        close: editModal.querySelector('.close-modal'),
        save: editModal.querySelector('#saveEdit'),
        input: editModal.querySelector('#editPassword'),
        error: editModal.querySelector('#editError'),
        textarea: editModal.querySelector('#editTextarea')
    };

    // Load saved description
    const productId = window.location.pathname.split('/').pop().split('.')[0];
    const description = document.getElementById('product-description');
    const savedDesc = localStorage.getItem(`product-desc-${productId}`);
    if (savedDesc && description) {
        description.innerHTML = savedDesc;
    }

    // Edit lock click
    editLock.addEventListener('click', function(e) {
        e.preventDefault();
        editModal.style.display = 'flex';
        if (modal.textarea && description) {
            modal.textarea.value = description.textContent;
        }
    });

    // Close modal
    modal.close.addEventListener('click', function() {
        editModal.style.display = 'none';
    });

    // Save changes
    modal.save.addEventListener('click', function() {
        if (!modal.input || !modal.textarea) return;
        
        if (modal.input.value !== PASSWORD) {
            modal.error.textContent = 'Incorrect password';
            return;
        }
        
        const newDesc = modal.textarea.value.trim();
        if (!newDesc) {
            modal.error.textContent = 'Description cannot be empty';
            return;
        }
        
        localStorage.setItem(`product-desc-${productId}`, newDesc);
        if (description) description.innerHTML = newDesc;
        editModal.style.display = 'none';
    });

    // Close when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === editModal) {
            editModal.style.display = 'none';
        }
    });
});
