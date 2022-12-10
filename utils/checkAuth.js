import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decodedToken = jwt.verify(token, "secretkey");
      req.userId = decodedToken._id;
      next();
    } catch (err) {
      return res.status(403).json({
        message: "Access denied",
      });
    }
  } else {
    return res.status(403).json({
      message: "Access denied",
    });
  }
};
