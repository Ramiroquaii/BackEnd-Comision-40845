const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// Set up multer storage and file filter
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        console.log('/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*');
        console.log(file.fieldname);
        console.log(path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Serve the HTML form to upload the image
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle the image upload
app.post('/upload', upload.single('image'), (req, res) => {
    res.send('Image uploaded successfully');
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
