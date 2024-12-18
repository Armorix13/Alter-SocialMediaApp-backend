import multer from 'multer';
import { Request } from 'express';
import path from 'path';
import fs from 'fs';

const uploadDir = path.resolve('./uploads'); 
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); 
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); 
    },
    filename: (req, file, cb) => {
        console.log("file",file)
        const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName); 
    },
});

const upload: multer.Multer = multer({
    storage,
});

export default upload;
