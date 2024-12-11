import JWT from "jsonwebtoken";
import passport from "passport";
export const generateToken = (user) => {
  return JWT.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRESIN_TIME,
  });
};

export const googleAuthCallback = (req, res) => {
  const token = generateToken(req.user);
  res.json({ message: "Google Authentication successful", token });
};
