const express = require("express");
const bodyParser = require("body-parser");
const PORT = 4000;

// db connection
require("./src/database/connection");

const bcrypt = require("bcrypt");
const saltrounds = 10;

const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("./src/models/User");
const Students = require("./src/models/Students");
const Teachers = require("./src/models/Teachers");

let ExtractJwt = passportJWT.ExtractJwt;

let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "thisisasecret";
jwtOptions.passReqToCallback = true;

// helper functions to work on database

const createUser = async ({ name, email, role, password }) => {
  return await User.create({ name, email, role, password });
};

const createStudent = async ({ id, bio, education, goal }) => {
  return await Students.create({ id, bio, education, goal });
};
const getAllUsers = async () => {
  return await User.findAll();
};

const getUser = async obj => {
  return await User.findOne({
    where: obj
  });
};

//create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(req, jwt_payload, done) {
  console.log("payload received", jwt_payload.id);
  const id = jwt_payload.id;
  User.findOne({ where: { id: id } }).then(user => {
    console.log(user);
    if (user) {
      return done(null, user);
    }
  });
});

passport.use(strategy);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

// get all users

app.get("/users", function(req, res) {
  getAllUsers().then(user => res.json(user));
});

//AUTH ROUTES
// register route

app.post("/register", function(req, res, next) {
  const { name, email, role, pass } = req.body;

  if (!name || !email || !pass) {
    return res.status(400).json({ msg: "Please enter info!" });
  }

  getUser({ name }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });
  });
  bcrypt.hash(pass, saltrounds, function(err, password) {
    createUser({ name, email, role, password }).then(user => {
      let payload = { id: user.id };
      let token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    });
  });
});

// login route

app.post("/login", async function(req, res, next) {
  const { name, password } = req.body;
  if (name && password) {
    getUser({ name })
      .then(user => {
        if (!user) {
          return res.status(404).json({ msg: "No such user found", user });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
          return res.status(401).json({ msg: "password is incorrect" });
        }
        let payload = { id: user.id };
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.send(token);
      })
      .catch(err => {
        res.status(500).send("error -> " + err);
      });
  }
});

//STUDENT INFO ROUTES

//creating student info
app.post(
  "/create_student_info",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    const { bio, education, goal } = req.body;
    const { id } = req.user;
    if (!id || !bio || !education || !goal) {
      return res.status(400).json({ msg: "Please enter info!" });
    }
    createStudent({ id, bio, education, goal }).then(info => {
      res.json({ info, msg: "student created" });
    });
  }
);
//creating teacher info
app.post(
  "/create_teacher_info",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    const { bio, education, best_sujbect, rate, current_occupation } = req.body;
    const { id } = req.user;
    if (
      !id ||
      !bio ||
      !education ||
      !best_sujbect ||
      !rate ||
      !current_occupation
    ) {
      return res.status(400).json({ msg: "Please enter info!" });
    }
    Teachers.create({
      id,
      bio,
      education,
      best_sujbect,
      rate,
      current_occupation
    }).then(info => {
      res.json({ info, msg: "student created" });
    });
  }
);

// protected route
app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    res.json({ msg: "congrats! this is a protected route!" });
  }
);

// get user

app.get("/getUser", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  const { name } = req.user;
  getUser({ name })
    .then(user => res.json(user))
    .catch(err => {
      res.status(500).send("error -> " + err);
    });
});

//get student
app.get(
  "/getStudent",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    const { id } = req.user;
    Students.findOne({ where: { id: id } })
      .then(student => res.json(student))
      .catch(err => {
        res.status(500).send("error -> " + err);
      });
  }
);

//get teacher
app.get(
  "/getTeacher",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    const { id } = req.user;
    Teachers.findOne({ where: { id: id } })
      .then(teacher => res.json(teacher))
      .catch(err => {
        res.status(500).send("error -> " + err);
      });
  }
);

//get teachers
app.get("/getTeachers", function(req, res) {
  const { best_sujbect, education } = req.body;
  Teachers.findAll({
    where: { best_sujbect: best_sujbect, education: education }
  })
    .then(teachers => res.json(teachers))
    .catch(err => {
      res.status(500).send("error -> " + err);
    });
});

app.get("/", function(req, res) {
  res.json({ message: "Express is up!" });
});

app.listen(PORT, function() {
  console.log(`Express is running on port ${PORT}`);
});
