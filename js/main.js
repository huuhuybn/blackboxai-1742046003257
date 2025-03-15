// Main application logic
const app = {
    init() {
        this.bindEvents();
        this.setupPasteButton();
    },

    bindEvents() {
        const downloadBtn = document.querySelector('#download-btn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', this.handleDownload.bind(this));
        }
    },

    setupPasteButton() {
        const pasteBtn = document.querySelector('#paste-btn');
        const urlInput = document.querySelector('#url-input');
        
        if (pasteBtn && urlInput) {
            pasteBtn.addEventListener('click', async () => {
                try {
                    const text = await navigator.clipboard.readText();
                    urlInput.value = text;
                } catch (err) {
                    console.error('Failed to read clipboard:', err);
                    this.showNotification('Please paste the URL manually', 'error');
                }
            });
        }
    },

    async handleDownload(event) {
        event.preventDefault();
        const urlInput = document.querySelector('#url-input');
        
        if (!urlInput.value) {
            this.showNotification('Please enter a Pinterest URL', 'error');
            return;
        }

        if (!this.isValidPinterestUrl(urlInput.value)) {
            this.showNotification('Please enter a valid Pinterest URL', 'error');
            return;
        }

        // Show loading state
        const downloadBtn = event.target;
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processing...';
        downloadBtn.disabled = true;

        try {
            // Simulate download process (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success notification
            this.showNotification('Download started successfully!', 'success');
            
            // Reset input
            urlInput.value = '';
        } catch (error) {
            console.error('Download error:', error);
            this.showNotification('Failed to process download. Please try again.', 'error');
        } finally {
            // Reset button state
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
        }
    },

    isValidPinterestUrl(url) {
        // Basic Pinterest URL validation
        return url.match(/^https?:\/\/(www\.)?pinterest\.(com|ca|co\.uk|fr|de|es|it|pt|ru|com\.au|ch|at|be|dk|fi|ie|nl|no|se|nz|mx|jp|ph|th|sg|id|my)\/.*$/i);
    },

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
            type === 'error' ? 'bg-red-500' : 'bg-green-500'
        } text-white max-w-md z-50 transform transition-all duration-300 translate-y-0 opacity-0`;
        
        // Add message and icon
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'} mr-2"></i>
                <span>${message}</span>
            </div>
        `;

        // Add to DOM
        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);

        // Remove after delay
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
} else {
    app.init();
}
