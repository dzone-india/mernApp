const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const http = require("http");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var app = express();
var PORT = process.env.PORT || 3333;
var config = require("./config.json");

app.disable("x-powered-by");
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// white listing origin from infinityCoding.com
// let whitelist = [/\.infinitycoding\.in$/, "http://192.46.214.45:3333", "http://192.46.214.45:5555", "http://192.46.214.45:9999"];
// if (process.env.NODE_ENV === 'development') {
//     whitelist.push('http://localhost:3333');
// }
// app.use(cors({
//     origin: whitelist,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
// }));
app.use(cors({ origin: "*" }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "VikramJeetSinwal",
    resave: false,
    saveUninitialized: true,
  })
);
// function errorHandler(err, req, res, next) {
//   console.log(next);
//   if (err) {
//     if (res.headersSent) {
//       return next(err);
//     }
//     res.status(500);
//     res.render("error", { error: err });
//   } else {
//     next();
//   }
// }
// app.use(errorHandler);
//const dir = path.join(__dirname, '/uploads');
//app.use("/uploads", express.static(dir));
app.use("/uploads", express.static("uploads"));

app.set("trust proxy", 1);

const MongoDBConnection = require("./Database/connection");
//const MySqlConnection = require('./Database/gammaDBConnection/connection');

var prefix = "/api/";

//app.use('/api/pricing', require('./controllers/pricing.controller')({ MongoDBConnection }));
console.log();
app.use(
  `${prefix}users`,
  require("./Controllers/UsersController")({ MongoDBConnection })
);
app.use(
  `${prefix}menuModule`,
  require("./Controllers/MenuModuleController")({ MongoDBConnection })
);
app.use(
  `${prefix}role`,
  require("./Controllers/RoleController")({ MongoDBConnection })
);
app.use(
  `${prefix}callback`,
  require("./Controllers/CallbackController")({ MongoDBConnection })
);
app.use(
  `${prefix}enquiry`,
  require("./Controllers/EnquiryController")({ MongoDBConnection })
);
app.use(
  `${prefix}review`,
  require("./Controllers/ReviewController")({ MongoDBConnection })
);
app.use(
  `${prefix}property`,
  require("./Controllers/PropertyController")({ MongoDBConnection })
);
app.use(
  `${prefix}feedback`,
  require("./Controllers/ClientFeedbackController")({ MongoDBConnection })
);
app.use(
  `${prefix}cms`,
  require("./Controllers/CMSController")({ MongoDBConnection })
);
app.use(
  `${prefix}slider`,
  require("./Controllers/SliderController")({ MongoDBConnection })
);
app.use(
  `${prefix}builder`,
  require("./Controllers/BuildingMaterialsController")({ MongoDBConnection })
);
app.use(
  `${prefix}services`,
  require("./Controllers/ServicesController")({ MongoDBConnection })
);
app.use(
  `${prefix}contactus`,
  require("./Controllers/ContactUsController")({ MongoDBConnection })
);
app.use(
  `${prefix}sitevisit`,
  require("./Controllers/siteVisitController")({ MongoDBConnection })
);
app.use(
  `${prefix}career`,
  require("./Controllers/CareerController")({ MongoDBConnection })
);
app.use(
  `${prefix}blog`,
  require("./Controllers/BlogController")({ MongoDBConnection })
);
app.use(
  `${prefix}home`,
  require("./Controllers/HomeController")({ MongoDBConnection })
);
app.use(
  `${prefix}team`,
  require("./Controllers/OurTeamController")({ MongoDBConnection })
);
app.use(
  `${prefix}booking`,
  require("./Controllers/BookingController")({ MongoDBConnection })
);
app.use(
  `${prefix}constructionProcess`,
  require("./Controllers/ConstructionProcessController")({ MongoDBConnection })
);
app.use(
  `${prefix}investWithUs`,
  require("./Controllers/InvestWithUsController")({ MongoDBConnection })
);
app.use(
  `${prefix}newsLetter`,
  require("./Controllers/NewsLetterController")({ MongoDBConnection })
);
app.use(
  `${prefix}aboutPage`,
  require("./Controllers/AboutController")({ MongoDBConnection })
);
app.use(
  `${prefix}finance`,
  require("./Controllers/FinanceController")({ MongoDBConnection })
);
app.use(
  `${prefix}otp`,
  require("./Controllers/OtpController")({ MongoDBConnection })
);
app.use(
  `${prefix}supplier`,
  require("./Controllers/SupplierController")({ MongoDBConnection })
);
app.use(
  `${prefix}deleteImage`,
  require("./Controllers/DeleteImageController")({ MongoDBConnection })
);

// let reactHTMLPath = process.env.NODE_ENV === 'production' ? "../FX-React/build" : "";

// reactHTMLPath = path.join(__dirname, reactHTMLPath);
// console.log('this will be the  build file path\n', reactHTMLPath + '/index.html');
// app.use(express.static(reactHTMLPath));
// // app.use(express.static(path.join(__dirname, 'build')));
// app.get('*', (req, res) => {
//     res.sendFile(reactHTMLPath + '/index.html')
//     // res.sendFile('index.html')
// });
app.get("/", (req, res, next) => {
  res.send("Server Started");
});
var server = http.createServer(app);
server.listen(PORT, () => {
  console.log("Server started at", PORT);
});
