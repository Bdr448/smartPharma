const BASE_URL = "http://localhost:5000/api"; // 👈 Replace with your actual backend URL if different

// ✅ Register user
export async function registerUser(data) {
  try {
    const res = await fetch(BASE_URL + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (err) {
    console.error("Register Error:", err);
    return { error: "Request failed" };
  }
}

// ✅ Login user
export async function loginUser(data) {
  try {
    const res = await fetch(BASE_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (err) {
    console.error("Login Error:", err);
    return { error: "Request failed" };
  }
}

// ✅ Token Verification
export async function verifyToken(token) {
  try {
    const res = await fetch(BASE_URL + "/auth/verify", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return await res.json();
  } catch (err) {
    console.error("Token Verify Error:", err);
    return { error: "Verification failed" };
  }
}
