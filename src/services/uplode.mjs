import multer from "multer";
import Path from "path"

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uplodes')
    }
    ,filename:(req,file,cb)=>{
        cb(null,Date.now()+Path.extname(file.originalname));

    }
})
const uplode=multer({storage:storage});


export default uplode