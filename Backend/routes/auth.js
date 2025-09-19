
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
