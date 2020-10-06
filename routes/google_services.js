const express = require("express");
const oAuth2 = require('../credentials.json')
const googleRoutes = express.Router();
const {google} = require('googleapis');
const multer = require('multer')
const fs = require('fs');
const CLIENT_ID = oAuth2.web.client_id
const CLIENT_SECRET = oAuth2.web.client_secret
const REDIRECT_URI = oAuth2.web.redirect_uris[1]
const oAuthClient = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
var isAuthenticated = false
const SCOPES = "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.profile"

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, __dirname.replace('routes','')+ '/images');
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    },
  });
  
  var upload = multer({
    storage: Storage,
  }).single("file"); //Field name and max count
express().use(upload)

googleRoutes.post("/getToken", (req, res) => {
    console.log(req.body.code)
  const code = req.body.code
  if(code){
      oAuthClient.getToken(code, (error, token)=>{
          if(error){
              console.log('Error : '+error)
              res.send({status:400, msg: 'something went wrong'})
          }else{
              res.send({status:200, msg: 'Auth success'})
              oAuthClient.setCredentials(token)
              console.log(token)
              isAuthenticated = true
          }
      })
  }
});

googleRoutes.get("/getProfile", (req,res) => {
    var oAuth2 = google.oauth2({
        auth: oAuthClient,
        version:'v2'
    })
    //user profile
    oAuth2.userinfo.get((error, response) => {
        if(error){
            res.send({status:400, msg:'Profile data not found'})
        }else{
             console.log(response.data)
            res.send(response.data)
        }

    })

})

googleRoutes.post("/upload", (req,res) => {
    upload(req,res,(err) => {
        if(err instanceof multer.MulterError){
            return res.send({status:500, msg:"Upload Failed. Something went wrong"})
        }else if(err){
            return res.send({status: 500, msg:"Upload Failed. Something went wrong" })
        }
        // return res.send({data: req.file})
        const driveObj = google.drive({
            auth:oAuthClient,
            version:'v3'
        })
        const fileMetadata = {
            name: req.file.filename
        }

        const media = {
            mimeType: req.file.mimetype,
            body: fs.createReadStream(req.file.path)
        }
        driveObj.files.create({
            resource: fileMetadata,
            media:media,
            fields: "id"
        },(error,file) => {
            if(error){
                res.send({status:500, msg:"Upload Failed. Something went wrong"})
            }else{
                fs.unlinkSync(req.file.path)
                res.send({status:200, msg: "File Successfully uploaded"})
            }
        })

    })
})

googleRoutes.get("/deleteToken", (req,res)=>{
    oAuthClient.revokeCredentials((error,body)=>{
        if(error){
            console.log(error)
        }else{
            console.log(body.data)
        }
    })
})

module.exports = googleRoutes;
