// // frontend/src/utils/api.js
// import { baseUrl } from "../../constants/global-variable";

// // Helper to get tokens from localStorage
// function getTokens() {
//   return {
//     accessToken: localStorage.getItem("accessToken"),
//     refreshToken: localStorage.getItem("refreshToken"),
//   };
// }

// // Helper to save tokens
// function saveTokens({ accessToken, refreshToken }) {
//   if (accessToken) localStorage.setItem("accessToken", accessToken);
//   if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
// }

// // Refresh access token if expired
// async function refreshAccessToken() {
//   const { refreshToken } = getTokens();
//   if (!refreshToken) {
//     throw new Error("No refresh token available");
//   }

//   const res = await fetch("http://localhost:3000/api/auth/refresh", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ refreshToken }),
//   });

//   if (!res.ok) {
//     throw new Error("Refresh token failed");
//   }

//   const data = await res.json();
//   saveTokens({ accessToken: data.accessToken });
//   return data.accessToken;
// }

// // Wrapper for fetch with auto-refresh
// export async function apiFetch(url, options = {}) {
//   let { accessToken } = getTokens();

//   // Attach token to headers
//   options.headers = {
//     ...(options.headers || {}),
//     Authorization: `Bearer ${accessToken}`,
//     "Content-Type": "application/json",
//   };

//   let res = await fetch(url, options);

//   // If unauthorized, try refreshing once
//   if (res.status === 401) {
//     try {
//       accessToken = await refreshAccessToken();

//       options.headers.Authorization = `Bearer ${accessToken}`;
//       res = await fetch(url, options);
//     } catch (err) {
//       console.error("❌ Token refresh failed:", err.message);
//       localStorage.clear(); // clear tokens
//       window.location.reload(); // force login again
//       throw err;
//     }
//   }

//   const data = await res.json();
//   if (!res.ok) throw new Error(data.error || "Request failed");
//   return data;
// }



import { baseUrl } from "../constants/global-variable";

// ✅ Get tokens from localStorage
function getTokens() {
  return {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
  };
}

// ✅ Save tokens
function saveTokens({ accessToken, refreshToken }) {
  if (accessToken) localStorage.setItem("accessToken", accessToken);
  if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
}

// ✅ Refresh access token if expired
async function refreshAccessToken() {
  const { refreshToken } = getTokens();
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const res = await fetch(`${baseUrl}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    throw new Error("Refresh token failed");
  }

  const data = await res.json();
  saveTokens({ accessToken: data.accessToken });
  return data.accessToken;
}

// ✅ Wrapper for fetch with auto-refresh
export async function apiFetch(url, options = {}) {
  let { accessToken } = getTokens();

  // Attach token to headers
  options.headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  let res = await fetch(url, options);

  // If unauthorized → try refreshing once
  if (res.status === 401) {
    try {
      accessToken = await refreshAccessToken();
      options.headers.Authorization = `Bearer ${accessToken}`;
      res = await fetch(url, options);
    } catch (err) {
      console.error("❌ Token refresh failed:", err.message);
      localStorage.clear(); // clear tokens
      window.location.reload(); // force re-login
      throw err;
    }
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}
