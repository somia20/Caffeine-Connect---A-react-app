const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const PORT = 80;
const db = require("./db");
const router = require("./router/Index");
const session = require("express-session");
const sessionTimeout = require("./middlewares/sessionTimeout");

const dashboardRouter = require("./router/dashboard");
//database connection

//cors
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // Allow credentials (i.e., session cookie)

}));

//CORS HEADERS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

db.connect();

//session timeout middleware
app.use(sessionTimeout);

//middle ware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// //cors
// app.use((req, res, next) => {
//   req.header("Access-Control-Allow-Origin", "*");
//   req.header("Access-Control-Allow-Headers", "*");
//   next();
// });

//session middleware
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge:  24*60*60 * 1000 }, // 30 seconds in milliseconds
  })
);

// Route handler for /login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Perform authentication
  if (authenticate(email, password)) {
  
    // Set user data in session
   
    res.status(200).send({ message: 'Logged in successfully' });
  } else {
    res.status(401).send({ message: 'Invalid email or password' });
  }
});

// Route handler for /logout
app.post('/logout', (req, res) => {
  // Clear session data
  req.session.destroy((err) => {
    if (err) {
      console.log('Error destroying session:', err);
      res.status(500).send({ message: 'Error logging out' });
    } else {
      // Send response indicating successful logout
      res.status(200).send({ message: 'Logged out successfully' });
    }
  });
});

// Route handler for /api/updateSession
app.post('/api/updateSession', (req, res) => {
  if (req.session.user) {
    console.log('Session updated');
    req.session.lastActivity = Date.now(); // Update the last activity time
    res.status(200).send({ message: 'Session updated' });
  } else {
    console.log('Session not found');
    res.status(401).send({ message: 'Session not found' });
  }
});




//routes

app.use("/api", router);

app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, "/../frontend/build")));


//routes
app.use("/", router);
app.use("/dashboard", dashboardRouter); // Add the dashboard router as middleware

app.get("*", (req, res) => {
  try {
    res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
  } catch (e) {
    res.send("Oops! unexpected error");
  }
});



app.use(cors());

//server listening
app.listen(process.env.PORT || PORT, () => {
  console.log(`Listening on port no ${PORT}`);
});