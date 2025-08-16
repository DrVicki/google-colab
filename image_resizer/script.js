class ImageResizer {
    constructor() {
        this.originalImage = null;
        this.currentImage = null;
        this.canvas = document.getElementById('imageCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.originalWidth = 0;
        this.originalHeight = 0;
        this.currentWidth = 0;
        this.currentHeight = 0;
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // File upload
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');

        uploadArea.addEventListener('click', () => fileInput.click());
        uploadArea.addEventListener('dragover', this.handleDragOver.bind(this));
        uploadArea.addEventListener('dragleave', this.handleDragLeave.bind(this));
        uploadArea.addEventListener('drop', this.handleDrop.bind(this));
        fileInput.addEventListener('change', this.handleFileSelect.bind(this));

        // Controls
        document.getElementById('width').addEventListener('input', this.handleResize.bind(this));
        document.getElementById('height').addEventListener('input', this.handleResize.bind(this));
        document.getElementById('maintainAspect').addEventListener('change', this.handleResize.bind(this));
        document.getElementById('sensitivity').addEventListener('input', this.updateSensitivityValue.bind(this));
        
        // Buttons
        document.getElementById('removeBackground').addEventListener('click', this.removeBackground.bind(this));
        document.getElementById('resetImage').addEventListener('click', this.resetImage.bind(this));
        document.getElementById('downloadImage').addEventListener('click', this.downloadImage.bind(this));
    }

    handleDragOver(e) {
        e.preventDefault();
        document.getElementById('uploadArea').classList.add('dragover');
    }

    handleDragLeave(e) {
        e.preventDefault();
        document.getElementById('uploadArea').classList.remove('dragover');
    }

    handleDrop(e) {
        e.preventDefault();
        document.getElementById('uploadArea').classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.loadImage(files[0]);
        }
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.loadImage(file);
        }
    }

    loadImage(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                this.originalImage = img;
                this.originalWidth = img.width;
                this.originalHeight = img.height;
                this.currentWidth = img.width;
                this.currentHeight = img.height;
                
                this.updateImageInfo();
                this.displayImage();
                this.showControls();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    displayImage() {
        if (!this.originalImage) return;

        // Set canvas size
        this.canvas.width = this.currentWidth;
        this.canvas.height = this.currentHeight;

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw image
        this.ctx.drawImage(this.originalImage, 0, 0, this.currentWidth, this.currentHeight);
        
        this.currentImage = this.canvas;
        this.updateImageInfo();
    }

    handleResize() {
        if (!this.originalImage) return;

        const widthInput = document.getElementById('width');
        const heightInput = document.getElementById('height');
        const maintainAspect = document.getElementById('maintainAspect').checked;

        let newWidth = parseInt(widthInput.value) || this.originalWidth;
        let newHeight = parseInt(heightInput.value) || this.originalHeight;

        if (maintainAspect) {
            const aspectRatio = this.originalWidth / this.originalHeight;
            
            if (widthInput.value && !heightInput.value) {
                // Only width specified
                newHeight = newWidth / aspectRatio;
                heightInput.value = Math.round(newHeight);
            } else if (heightInput.value && !widthInput.value) {
                // Only height specified
                newWidth = newHeight * aspectRatio;
                widthInput.value = Math.round(newWidth);
            } else if (widthInput.value && heightInput.value) {
                // Both specified, maintain aspect ratio
                const widthRatio = newWidth / this.originalWidth;
                const heightRatio = newHeight / this.originalHeight;
                const ratio = Math.min(widthRatio, heightRatio);
                
                newWidth = this.originalWidth * ratio;
                newHeight = this.originalHeight * ratio;
                
                widthInput.value = Math.round(newWidth);
                heightInput.value = Math.round(newHeight);
            }
        }

        this.currentWidth = Math.round(newWidth);
        this.currentHeight = Math.round(newHeight);
        
        this.displayImage();
    }

    updateSensitivityValue() {
        const sensitivity = document.getElementById('sensitivity');
        const sensitivityValue = document.getElementById('sensitivityValue');
        sensitivityValue.textContent = sensitivity.value;
    }

    async removeBackground() {
        if (!this.originalImage) {
            alert('Please upload an image first.');
            return;
        }

        this.showLoading(true);

        try {
            // Create a temporary canvas for processing
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            
            tempCanvas.width = this.currentWidth;
            tempCanvas.height = this.currentHeight;
            
            // Draw the current image
            tempCtx.drawImage(this.originalImage, 0, 0, this.currentWidth, this.currentHeight);
            
            // Get image data
            const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
            const data = imageData.data;
            
            // Get sensitivity value
            const sensitivity = parseInt(document.getElementById('sensitivity').value);
            const threshold = (sensitivity / 100) * 255;
            
            // Simple background removal algorithm
            // This is a basic implementation - for production, you'd want to use a more sophisticated approach
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                
                // Calculate brightness
                const brightness = (r + g + b) / 3;
                
                // Check if pixel is likely background (bright areas)
                if (brightness > threshold) {
                    // Make pixel transparent
                    data[i + 3] = 0; // Alpha channel
                }
            }
            
            // Apply the processed image data
            tempCtx.putImageData(imageData, 0, 0);
            
            // Update the main canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(tempCanvas, 0, 0);
            
            this.currentImage = this.canvas;
            
        } catch (error) {
            console.error('Error removing background:', error);
            alert('Error removing background. Please try again.');
        } finally {
            this.showLoading(false);
        }
    }

    resetImage() {
        if (!this.originalImage) return;

        // Reset dimensions
        this.currentWidth = this.originalWidth;
        this.currentHeight = this.originalHeight;
        
        // Reset inputs
        document.getElementById('width').value = '';
        document.getElementById('height').value = '';
        document.getElementById('maintainAspect').checked = true;
        
        // Redisplay original image
        this.displayImage();
    }

    downloadImage() {
        if (!this.currentImage) {
            alert('Please upload an image first.');
            return;
        }

        // Create a temporary canvas for the final image
        const downloadCanvas = document.createElement('canvas');
        const downloadCtx = downloadCanvas.getContext('2d');
        
        downloadCanvas.width = this.currentWidth;
        downloadCanvas.height = this.currentHeight;
        
        // Draw the current image
        downloadCtx.drawImage(this.canvas, 0, 0);
        
        // Convert to blob and download
        downloadCanvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `processed_image_${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 'image/png');
    }

    updateImageInfo() {
        const originalSize = document.getElementById('originalSize');
        const currentSize = document.getElementById('currentSize');
        
        originalSize.textContent = `${this.originalWidth} × ${this.originalHeight}`;
        currentSize.textContent = `${this.currentWidth} × ${this.currentHeight}`;
    }

    showControls() {
        document.getElementById('controlsSection').style.display = 'block';
        document.getElementById('previewSection').style.display = 'block';
    }

    showLoading(show) {
        const loadingOverlay = document.getElementById('loadingOverlay');
        loadingOverlay.style.display = show ? 'flex' : 'none';
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ImageResizer();
});

// Add some helpful utility functions
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case 'z':
                e.preventDefault();
                document.getElementById('resetImage').click();
                break;
            case 's':
                e.preventDefault();
                document.getElementById('downloadImage').click();
                break;
        }
    }
});
