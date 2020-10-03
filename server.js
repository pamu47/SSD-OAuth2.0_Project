// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors')
const oAuth2 = require('./credentials.json')
const {google} = require('googleapis')
const googleRoutes = require('./routes/google_services')
const bodyParser = require('body-parser')
const multer = require('multer')

const CLIENT_ID = oAuth2.web.client_id
const CLIENT_SECRET = oAuth2.web.client_secret
const REDIRECT_URI = oAuth2.web.redirect_uris[1]
const oAuthClient = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
var isAuthenticated = false
const SCOPES = "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.profile"

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static((__dirname, "./client/build")))
app.use(multer({dest:'./routes/images'}).single('file'))
// app.get('*',(req, res) => {
//     res.sendFile(path.join(__dirname, '/', './client/build', 'index.html' ));
// });
app.use('/google', googleRoutes);

app.get('/', (req,res) => {
    if(!isAuthenticated){
        var url = oAuthClient.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES
        })
        // console.log(url)
        res.send({url: url})
    }else{

    }
})

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
});
