const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  dateOfBirth: { type: Date },
  password: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
  roleId: { type: Schema.Types.ObjectId, ref: "Role" },
  isActive: { type: Boolean, default: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
