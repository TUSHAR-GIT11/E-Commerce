const jwt = require("jsonwebtoken");
const jwtAuthMiddleware = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization)
      return res.status(401).json({ message: "token not found" });
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json({ message: "token not found" });
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
   console.log(err)
   res.status(401).json({error:"Internal server error"})
  }
};

const generateToken = (userData)=>{
   return jwt.sign(userData,process.env.JWT_SECRET)
}

module.exports = {jwtAuthMiddleware, generateToken}
