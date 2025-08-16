# Image Resizer & Background Remover

A modern, web-based image processing application with a beautiful purple theme that allows you to resize images and remove backgrounds with ease.

## Features

### 🖼️ Image Upload
- Drag and drop image files directly onto the upload area
- Click to browse and select images from your device
- Supports all common image formats (JPEG, PNG, GIF, WebP, etc.)

### 📏 Image Resizing
- Resize images to specific dimensions
- Maintain aspect ratio automatically
- Real-time preview of changes
- Input width and height independently or together

### ✂️ Background Removal
- Remove backgrounds from images using intelligent algorithms
- Adjustable sensitivity control for fine-tuning
- Real-time processing with visual feedback
- Creates transparent backgrounds for easy compositing

### 💾 Save & Download
- Download processed images in PNG format
- Preserves transparency for background-removed images
- Automatic file naming with timestamps

### 🎨 User Interface
- Beautiful purple gradient theme
- Responsive design that works on all devices
- Intuitive controls with visual feedback
- Loading indicators for processing operations

## How to Use

### Getting Started
1. Open `index.html` in your web browser
2. The application will load with a purple gradient background

### Uploading an Image
1. **Drag & Drop**: Simply drag an image file from your computer and drop it onto the upload area
2. **Click to Browse**: Click on the upload area to open a file browser and select an image

### Resizing Images
1. After uploading, the resize controls will appear
2. Enter desired width and/or height in pixels
3. Check "Maintain Aspect Ratio" to keep proportions
4. Changes are applied automatically as you type

### Removing Backgrounds
1. Click the "Remove Background" button
2. Adjust the sensitivity slider to control how aggressive the removal is
3. Higher sensitivity removes more of the background
4. Lower sensitivity preserves more of the original image

### Saving Your Work
1. Click the "Download" button to save the processed image
2. Images are saved as PNG files with transparency support
3. Files are automatically named with timestamps

### Keyboard Shortcuts
- `Ctrl/Cmd + Z`: Reset image to original
- `Ctrl/Cmd + S`: Download processed image

## Technical Details

### Browser Compatibility
- Modern browsers with HTML5 Canvas support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers supported

### Image Processing
- Client-side processing using HTML5 Canvas
- No server required - all processing happens in your browser
- Background removal uses brightness-based algorithms
- Maintains image quality during resizing

### File Formats
- **Input**: JPEG, PNG, GIF, WebP, BMP, TIFF
- **Output**: PNG (with transparency support)

## File Structure

```
image_resizer/
├── index.html          # Main application file
├── styles.css          # Styling and purple theme
├── script.js           # Application logic and functionality
└── README.md           # This documentation
```

## Customization

### Changing the Theme
The purple theme can be customized by modifying the CSS variables in `styles.css`:

```css
/* Main gradient colors */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Accent colors */
color: #667eea;
```

### Adding Features
The modular JavaScript structure makes it easy to add new features:
- New image filters can be added to the `ImageResizer` class
- Additional controls can be added to the HTML and connected via event listeners
- Custom processing algorithms can be implemented in the canvas context

## Browser Security Notes

- The application runs entirely in your browser
- No images are uploaded to external servers
- All processing is done locally for privacy and speed
- Some browsers may require HTTPS for certain features in production

## Performance Tips

- Large images (>10MB) may take longer to process
- Background removal works best on images with clear subject/background separation
- For best results, use images with good contrast between subject and background

## Troubleshooting

### Image Not Loading
- Ensure the image file is not corrupted
- Try a different image format
- Check browser console for error messages

### Background Removal Not Working Well
- Adjust the sensitivity slider
- Try images with better contrast
- Ensure the subject is clearly separated from the background

### Download Not Working
- Check if your browser allows downloads
- Ensure you have sufficient disk space
- Try refreshing the page and processing again

## License

This project is open source and available under the MIT License.

---

**Enjoy processing your images with this beautiful purple-themed application!** 🎨
