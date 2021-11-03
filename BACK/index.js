/* Requiring dotenv allows loads environment variables from a .env file into process.env. */
require('dotenv').config();

/* -------------------------------------* /
/* Initialising Express */
const express = require('express');
/* -------------------------------------* /
/* Initialising Cloudinary */
const cloudinary = require('cloudinary');
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
/* ------------------------------------- */
/* Calling Express */
const app = express();


cloudinary.config({ 
    cloud_name : "dieupu7jn" , 
    api_key : '761866131662332' , 
    api_secret : 'Ch_tOPLd7DInTQj4S6iudmVvhEo' ,
 });

 const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "oProjethèque",
    },
  });
  const upload = multer({ storage: storage });
  app.post("/", upload.single("picture"), async (req, res) => {
    return res.json({ picture: req.file.path });
  });
  
  /* ------------------------------------- */
/* Requiring Express-JWT*/
const jwt = require('express-jwt');

/* ------------------------------------- */
/* Requiring jsonwebtoken */
const jsonwebtoken = require('jsonwebtoken');

/* ------------------------------------- */
// const jwtSecret = 'IIUFHW98YW4TFHJCX7fr4r90ixjjnxcxe98208eJIHXKSIFOR9T2KAK';
/* ------------------------------------- */

/* Access rights agreement to the information of a POST via req.body -
The extented to false allows to receive only values of type string or array. 
If it is true, we can receive any type of value.
The middleware to parse the data received especially when sending a form.
*/
app.use(express.urlencoded({ extended: true }));
/* ------------------------------------- */

// const authorizationMiddleware = jwt({
//     secret: jwtSecret, 
//     algorithms: ['HS256'
// });

/* ------------------------------------- */
/* User management through middlewares (visitor, student, admin) */
/* Tracks visitors */
// const visitorMiddleware = require("./app/middlewares/visitorMiddleware.js");
// app.use(visitorMiddleware);

/* ------------------------------------- */
/* Update locals with user data */
// const userMiddleware = require("./app/middlewares/userMiddleware");
// app.use(userMiddleware);

/* ------------------------------------- */
/* Middleware that allows to display and receive json via POST */
app.use(express.json());

/* ------------------------------------- */
/* Authorization to access the API for the whole world */
const cors = require('cors');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    next();
});
app.use(cors({
    origin: '*'}));

const multerMiddleware = multer({storage: storage});
/* ------------------------------------- */
/* Port setup - support for the port chosen by the developer if there is one, otherwise 5000 */
const port = process.env.PORT || 5000;

/* ------------------------------------- */
/* Requiring router */
const router = require("./app/router.js");
app.use(router);

/* ------------------------------------- */
/* Launching server */
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

app.post('/upload',
    multerMiddleware.single('mon-fichier'),
    (req, res) => {
        // A ce stade, le middleware multer a déjà uploadé le fichier sur cloudinary,
        // le lien de l'image uploadée est accessible dans req
        const fileURL = req.file.path;

        // Ici, vous pouvez enregistrer ce lien dans votre base de donnée

        console.log('Lien Cloudinary', fileURL)

        res.json({ path: fileURL });
    });