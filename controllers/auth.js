const User = require("../models/user");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const { EmailTransporter } = require("../EmailTransporter");
const { OtpController } = require("./OtpController");
const { check, validationResult } = require("express-validator");
const { Authclient } = require("google-auth-library");

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "not able to save user in DB",
      });
    }
    const isOtpSent = OtpController(user);
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USer email does not exists",
      });
    }
    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "email and password do not match",
      });
    }
    if (user.registrationConfirmed === false)
      return res.status(401).send("Verify your Email ID");
    //create token
    const token = jwt.sign({ _id: user._id }, "shhhh");
    // put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    // send response to frontend
    const { _id, name, email } = user;
    return res.json({ token, user: { _id, name, email } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully",
  });
};

// protected routes
exports.issignin = expressJwt({
  secret: "shhhh",
  userProperty: "auth",
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.auth == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.googlelogin = (req, res) => {
  const client = new Authclient(
    "770410488707-l26b3qoq3pvcco7je1dv2jkm5fcjum1g.apps.googleusercontent.com"
  );

  const { tokenId } = req.body;
  client
    .verifyIdToken({
      idToken: tokenId,
      audience:
        "770410488707-l26b3qoq3pvcco7je1dv2jkm5fcjum1g.apps.googleusercontent.com",
    })
    .then((response) => {
      const { email_verified, name, email } = response.payload;
      console.log(response.payload);
    });
  console.log();
};
