import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  googleId: { type: String },
  image: { type: String },
});
export default mongoose.model("User", userSchema);
