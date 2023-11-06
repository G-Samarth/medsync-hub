const express = require('express')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const ejs = require('ejs')
const morgan = require("morgan");
const path = require('path')
const AppError = require('./utils/appError')
const userRouter = require('./routes/userRoute');
const prescriptionRouter = require('./routes/prescriptionRoute')
const viewRouter = require('./routes/viewRouter')
const newsRouter = require('./routes/newsRoute')

const app = express()

app.use(
    bodyParser.urlencoded({
      extended: true,
    })
);

app.set('views','./views');
app.set('view engine','ejs')
app.use(express.static(`${__dirname}/public`))

//setting up the middleware for the static files
app.use(express.static(path.join(__dirname, "public")));
  
//Development loging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
  
//BEFORE body-parser
app.post(
    "/webhook-checkout",
    bodyParser.raw({
      type: "application/json",
    })
);
  
// Body parser, reading data from body into req.body
app.use(
    express.json({
      limit: "10kb",
    })
);
app.use(
    express.urlencoded({
      extended: true,
      limit: "10kb",
    })
);

app.use(cookieParser());

app.use('/',viewRouter);

// routes for users
app.use('/api/user',userRouter)

//route for prescription
app.use('/api/prescription',prescriptionRouter)

app.use('/news',newsRouter);

// app.get('/api/news', (req, res) => {
//   res.render('news')
// })

module.exports = app