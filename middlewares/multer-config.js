const multer=require("multer"),MIME_TYPES={"image/jpg":"jpg","image/jpeg":"jpg","image/png":"png","image/gif":"gif","image/svg":"svg"},storage=multer.diskStorage({destination:(req,file,callback)=>{callback(null,"temp")},filename:(req,file,callback)=>{let name=file.originalname.split(" ").join("_");callback(null,Date.now()+"-"+name)}});module.exports=multer({storage:storage}).single("photo");