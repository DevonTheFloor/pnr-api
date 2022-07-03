const express=require("express"),router=express.Router(),multer=require("../middlewares/multer-config"),annCtrl=require("../controllers/annonce");var RateLimit=require("express-rate-limit"),MongoStore=require("rate-limit-mongo"),limiter=new RateLimit({store:new MongoStore({uri:process.env.PNR_LIMIT_STORE,user:"",password:"",expireTimeMs:9e5,errorHandler:console.error.bind(null,"rate-limit-mongo")}),max:50,windowMs:9e5});router.get("/une/:id",annCtrl.getOne).get("/voir/",annCtrl.getAll).get("/accueil/",annCtrl.getAccueil).post("/rechercher/",annCtrl.getRecherche).post("/poster/",multer,annCtrl.postAnnonce).post("/suppression/",limiter,annCtrl.delAnnonce),module.exports=router;