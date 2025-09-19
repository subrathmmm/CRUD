

import React from "react";
import { VStack, Text } from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Login({ onLogin }) {
  const handleSuccess = async (credentialResponse) => {
    const googleToken = credentialResponse?.credential;
    if (!googleToken) {
      console.error("❌ No credential returned from Google");
      return;
    }

    try {
      const decoded = jwtDecode(googleToken);
      console.log("✅ Google user:", decoded);
    } catch (e) {
      console.error("❌ Failed to decode Google token:", e);
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: googleToken }),
      });

      const data = await res.json();

      if (res.ok && data.accessToken && data.refreshToken) {
        console.log(
          "✅ Saving tokens | access:",
          data.accessToken.slice(0, 20) + "...",
          "| refresh:",
          data.refreshToken.slice(0, 20) + "..."
        );

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        onLogin(); // tell App.jsx we’re logged in
      } else {
        console.error("❌ Backend did not return valid tokens:", data);
      }
    } catch (err) {
      console.error("❌ Login error:", err);
    }
  };

  return (
    <VStack spacing={6} justify="center" minH="100vh">
      <Text fontSize="2xl" fontWeight="bold">
        Employee CRUD System
      </Text>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.error("❌ Google Login Failed")}
      />
    </VStack>
  );
}

export default Login;
