const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const roles = ["admin", "manager", "user"];

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    email:    { type: String, unique: true, required: true, trim: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role:     { type: String, enum: roles, default: "user" },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

UserSchema.methods.toSafeJSON = function () {
  return { id: this._id.toString(), username: this.username, email: this.email, role: this.role };
};

module.exports = mongoose.model("User", UserSchema);