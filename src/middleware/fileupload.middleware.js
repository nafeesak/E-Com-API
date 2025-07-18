//1.Impoet Multer
import multer from "multer";

//2. configure the storage with filename and location
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads')
    },
    filename:(req,file,cb)=>{
        //Windows Issue
      //  cb(null,new Date().toISOString()+ file.originalname)
      cb(
null,
new Date().toISOString().replace(/:/g, '_') +
file.originalname
);

    }
})
export const upload=multer({storage:storage})

//Create it if file upload folder doesnot exist
// const fs = require('fs');
// const path = require('path');

// const uploadDir = path.join(__dirname, 'uploads');

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
//}
//ES6 module
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';
// import fs from 'fs';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const uploadDir = join(__dirname, 'uploads');

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }