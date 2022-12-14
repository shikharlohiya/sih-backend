var mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },
  lastname: {
    type: String,
    maxlength: 32,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  userinfo: {
    type: String,
  },
  // combaack here for password
  encry_password: {
    type: String,
    required: true,
  },
  salt: String,
  role: {
    type: String,
    default: 0,
  },
  purchases: [
    {
      qr: {
        type: String,
        default: "",
      },
    },
  ],
  mobile: {
    type: String,
  },
  gender: {
    type: String,
  },
  idNumber: {
    type: String,
  },
  verificationExpries: {
    type: Date,
    default: () => new Date(+new Date() + 10 * 60 * 1000),
  },
  registrationConfirmed: {
    type: Boolean,
    default: false,
  },
});

userSchema.index(
  { verificationExpries: 1 },
  {
    expireAfterSeconds: 0,
    partialFilterExpression: { registrationConfirmed: false },
  }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  autheticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
