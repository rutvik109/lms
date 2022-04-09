const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const PORT= process.env.PORT || 80;
const dbURI ="mongodb+srv://rutvik:1092rutvik@cluster0.ow8y9.mongodb.net/stige?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true,  })
  .then((result) => app.listen(PORT))
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/profile", requireAuth, (req, res) => res.render("profile"));
app.get("/task", requireAuth, (req, res) => res.render("task"));
app.get("/course", requireAuth, (req, res) => res.render("course"));
app.use(authRoutes);