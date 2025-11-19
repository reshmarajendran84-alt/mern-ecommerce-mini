const multer =require("multer");//handles file uploads (images).
const path=require("path");//helps get file extension (e.g., .jpg, .png).

const storage =multer.diskStorage({
    desitination:"uploads/",//"uploads/" → files will be saved inside this folder.
    filename:(req,file,cd)=>{
        cd(null,Date.now()=path.extname(file.originalname));//Folder must exist OR Express will create it when uploading.

    }
});
module.exports=multer({storage});
