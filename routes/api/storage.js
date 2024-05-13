const express = require('express')
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;
const { ensureAuthenticated } = require("../../middlewares/validate-jwt.js")
const {updateAvatar} = require('../../models/auth')

const app = express();
const multer = require('multer')
const Jimp = require('jimp')

const uploadDir = path.join(process.cwd(), 'uploads')
const storeAvatars = path.join(process.cwd(), 'public/avatars')

const storage = multer.diskStorage({
    destination: (req, file, cb) => { 
        cb(null, uploadDir)
        
    },
    filename: (req, file, cb) => { 
         cb(null, file.originalname)
    },
    limits: {
        fileSize: 1048576
    }
})

const upload = multer({
    storage: storage
})



router.patch('/avatars', ensureAuthenticated, upload.single('avatar'), async (req, res) => {
    
    const { path: temporaryName, originalname } = req.file;
    const fileName = path.join(storeAvatars, originalname)
    
    try {
        const result = await updateAvatar(req.user.idUser, originalname)
        await fs.rename(temporaryName, fileName)
        if (result) { 
            await Jimp.read(`././public/avatars/${originalname}`)
                .then((image) => {
                    image.resize(250, 250).write(`././public/avatars/${originalname}`)
                    
                })
                .catch((err) => {
                    console.log(err)
                });
             return res.status(200).json({ avatarURL: `http://localhost:3000/avatars/${originalname}` }) 
        }
    } catch (error) {
        await fs.rename(temporaryName)
        return next(err)
    }


     
  
    
});

module.exports = router