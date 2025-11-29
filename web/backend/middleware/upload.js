import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Create assets folder if it doesn't exist
const assetsDir = path.join(process.cwd(), 'uploads/products');
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, assetsDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only image files (jpeg, jpg, png, gif, webp) are allowed!'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB per file
});

export default upload;
