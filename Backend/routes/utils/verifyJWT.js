import jwt from "jsonwebtoken";

export default function verifyJWT(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.sendStatus(403);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(401);
    req.user = decoded;
    next();
  });
}
