// Dashboard specific logic
document.addEventListener('DOMContentLoaded', () => {
    // Enable Bootstrap Tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    // Simple Tab Logic handled by Bootstrap Nav Tabs directly in HTML
    // Any extra chart logic would go here
});
