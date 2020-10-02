const express = require("express");
const oAuth2 = require('../credentials.json')
const googleRoutes = express.Router();
const {google} = require('googleapis');
const { oauth2 } = require("googleapis/build/src/apis/oauth2");

const CLIENT_ID = oAuth2.web.client_id
const CLIENT_SECRET = oAuth2.web.client_secret
const REDIRECT_URI = oAuth2.web.redirect_uris[1]
const oAuthClient = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
var isAuthenticated = false
const SCOPES = "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.profile"
var x = 0

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

googleRoutes.get("/deleteToken", (req,res)=>{
    // res.send("new value : "+x)
    oAuthClient.revokeCredentials((error,body)=>{
        if(error){
            console.log(error)
        }else{
            console.log(body.data)
        }
    })
})

module.exports = googleRoutes;
