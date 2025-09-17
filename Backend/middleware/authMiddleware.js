// import jwt from "jsonwebtoken";

// export function authenticate(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   if (!authHeader) {
//     console.error("❌ No Authorization header found");
//     return res.status(401).json({ error: "Missing Authorization header" });
//   }

//   const token = authHeader.split(" ")[1];
//   if (!token) {
//     console.error("❌ No token after Bearer");
//     return res.status(401).json({ error: "Token missing" });
//   }

//   console.log("🔑 Incoming token (first 20 chars):", token.slice(0, 20) + "...");

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("✅ Decoded JWT payload:", decoded);
//     req.user = decoded; // save user data in request
//     next();
//   } catch (err) {
//     console.error("❌ JWT verification failed:", err.message);
//     return res.status(401).json({ error: "Invalid or expired token" });
//   }
// }




// import jwt from "jsonwebtoken";

// export function authenticate(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   if (!authHeader) {
//     return res.status(401).json({ error: "Missing Authorization header" });
//   }

//   const token = authHeader.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ error: "Token missing" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     console.error("❌ Access token verification failed:", err.message);
//     return res.status(401).json({ error: "Access token expired" });
//   }
// }



import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Access token expired" });
    }
    return res.status(401).json({ error: "Invalid token" });
  }
}
