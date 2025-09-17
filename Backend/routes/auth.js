// import express from "express";
// import jwt from "jsonwebtoken";
// import { OAuth2Client } from "google-auth-library";

// const router = express.Router();
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// router.post("/google", async (req, res) => {
//   try {
//     const { token } = req.body;
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });
//     const payload = ticket.getPayload();

//     // Example: save user to DB if not exists
//     const user = {
//       email: payload.email,
//       name: payload.name,
//     };

//     // Issue JWT
//     const jwtToken = jwt.sign(user, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.json({ jwtToken, user });
//   } catch (err) {
//     res.status(401).json({ error: "Invalid Google Token" });
//   }
// });

// export default router;



// import express from "express";
// import jwt from "jsonwebtoken";
// import { OAuth2Client } from "google-auth-library";
// import dotenv from "dotenv";   // ✅ add this

// dotenv.config();               // ✅ load .env

// const router = express.Router();
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


// console.log("JWT_SECRET in backend:", process.env.JWT_SECRET);

// router.post("/google", async (req, res) => {
//   try {
//     const { token } = req.body;
//     if (!token) {
//       return res.status(400).json({ error: "Token missing" });
//     }

//     // Verify Google token
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();

//     // Build user object
//     const user = {
//       id: payload.sub,       // unique Google user ID
//       email: payload.email,
//       name: payload.name,
//       picture: payload.picture,
//     };

//     // Sign JWT
//     if (!process.env.JWT_SECRET) {
//       throw new Error("JWT_SECRET is missing from .env");
//     }

//     const jwtToken = jwt.sign(
//       { id: user.id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.json({ jwtToken, user });
//   } catch (err) {
//     console.error("Google login error:", err.message);
//     res.status(401).json({ error: "Invalid Google Token" });
//   }
// });

// export default router;






// import express from "express";
// import jwt from "jsonwebtoken";
// import { OAuth2Client } from "google-auth-library";
// import dotenv from "dotenv";

// dotenv.config();

// const router = express.Router();
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// router.post("/google", async (req, res) => {
//   try {
//     const { token } = req.body;
//     if (!token) {
//       return res.status(400).json({ error: "Token missing" });
//     }

//     // Verify Google token
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();

//     // User object
//     const user = {
//       id: payload.sub,
//       email: payload.email,
//       name: payload.name,
//       picture: payload.picture,
//     };

//     if (!process.env.JWT_SECRET) {
//       throw new Error("JWT_SECRET is missing from .env");
//     }

//     // Sign JWT
//     const jwtToken = jwt.sign(
//       { id: user.id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

    
//     console.log("🎯 Issued backend JWT:", jwtToken);

//     res.json({ jwtToken, user });
//   } catch (err) {
//     console.error("Google login error:", err.message);
//     res.status(401).json({ error: "Invalid Google Token" });
//   }
// });

// export default router;




// import express from "express";
// import jwt from "jsonwebtoken";
// import { OAuth2Client } from "google-auth-library";
// import dotenv from "dotenv";

// dotenv.config();
// const router = express.Router();
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// // helper to generate tokens
// function generateAccessToken(user) {
//   return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "15m" }); // short-lived
// }

// function generateRefreshToken(user) {
//   return jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" }); // long-lived
// }

// // Google login endpoint
// router.post("/google", async (req, res) => {
//   try {
//     const { token } = req.body;
//     if (!token) return res.status(400).json({ error: "Token missing" });

//     // verify Google ID token
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();
//     const user = { id: payload.sub, email: payload.email };

//     // issue tokens
//     const accessToken = generateAccessToken(user);
//     const refreshToken = generateRefreshToken(user);

//     // 👉 (Optional) Store refreshToken in DB against user.id

//     return res.json({ accessToken, refreshToken, user });
//   } catch (err) {
//     console.error("Google login error:", err.message);
//     return res.status(401).json({ error: "Invalid Google Token" });
//   }
// });

// // Refresh endpoint
// router.post("/refresh", (req, res) => {
//   const { refreshToken } = req.body;
//   if (!refreshToken) {
//     return res.status(401).json({ error: "Missing refresh token" });
//   }

//   try {
//     const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

//     const newAccessToken = generateAccessToken({
//       id: user.id,
//       email: user.email,
//     });

//     return res.json({ accessToken: newAccessToken });
//   } catch (err) {
//     console.error("Refresh token error:", err.message);
//     return res.status(403).json({ error: "Invalid or expired refresh token" });
//   }
// });

// export default router;




import express from "express";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helpers to generate tokens
function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "15m" });
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: "1h" });
}

// Google login endpoint
router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: "Token missing" });

    // verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const user = { id: payload.sub, email: payload.email };

    // issue tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // 👉 you can store refreshToken in DB if you want
    return res.json({ accessToken, refreshToken, user });
  } catch (err) {
    console.error("Google login error:", err.message);
    return res.status(401).json({ error: "Invalid Google Token" });
  }
});

// Refresh endpoint
router.post("/refresh", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ error: "Missing refresh token" });
  }

  try {
    const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = generateAccessToken({
      id: user.id,
      email: user.email,
    });

    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Refresh token error:", err.message);
    return res.status(403).json({ error: "Invalid or expired refresh token" });
  }
});

export default router;
