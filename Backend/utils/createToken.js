import jwt from "jsonwebtoken";

const createToken = (user) => {
  // JWT payload me user ID aur role daal do
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

export default createToken;
