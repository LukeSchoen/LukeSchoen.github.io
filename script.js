document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const themeToggleButton = document.getElementById('theme-toggle');

    // Function to switch tabs
    function switchTab(event) {
        event.preventDefault();

        tabs.forEach(tab => tab.classList.remove('active-tab'));
        tabContents.forEach(content => content.classList.remove('active-content'));

        const clickedTab = event.currentTarget;
        const targetTabId = clickedTab.getAttribute('data-tab');
        const targetContent = document.getElementById(targetTabId);

        clickedTab.classList.add('active-tab');
        if (targetContent) {
            targetContent.classList.add('active-content');
        }
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', switchTab);
    });

    // Theme switcher functionality
    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');

        // Store preference
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeToggleButton.textContent = 'Light Mode';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggleButton.textContent = 'Dark Mode';
        }
    }

    // Load saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme'); // Ensure light is not active
        themeToggleButton.textContent = 'Light Mode';
    } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme'); // Ensure dark is not active
        const statusEl = document.getElementById('status-text');
        if (statusEl) {
            statusEl.textContent = 'Some message';
        }
    }

    // Task drag and drop (basic implementation)
    const taskCards = document.querySelectorAll('.task-card');
    const taskColumns = document.querySelectorAll('.task-column');

    taskCards.forEach(card => {
        card.addEventListener('dragstart', () => {
            card.classList.add('dragging');
        });

        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
        });
    });

    taskColumns.forEach(column => {
        column.addEventListener('dragover', event => {
            event.preventDefault();
            const afterElement = getDragAfterElement(column, event.clientY);
            const draggingCard = document.querySelector('.dragging');
            if (draggingCard) {
                if (afterElement == null) {
                    column.appendChild(draggingCard);
                } else {
                    column.insertBefore(draggingCard, afterElement);
                }
            }
        });
    });

    function getDragAfterElement(column, y) {
        const draggableElements = [...column.querySelectorAll('.task-card:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // Set initial active tab based on URL hash or default to 'play'
    const currentHash = window.location.hash.substring(1);
    let initialTab = 'play';
    if (currentHash) {
        const foundTab = Array.from(tabs).find(t => t.getAttribute('data-tab') === currentHash);
        if (foundTab) {
            initialTab = currentHash;
        }
    }

    document.querySelector(`.nav-tab[data-tab="${initialTab}"]`).click();

});