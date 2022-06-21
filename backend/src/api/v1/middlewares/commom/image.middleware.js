import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        console.log('upload images ...')
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
export const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        let extension = path.extname(file.originalname);
        if (extension != '.png' && extension != '.jpg' && extension != '.jpeg') {
            req.fileExtensionValidationError = true
            return cb(null, false, req.fileExtensionValidationError);
        }
        req.fileExtensionValidationError = false
        cb(null, true, req.fileExtensionValidationError);
    }
    
});
