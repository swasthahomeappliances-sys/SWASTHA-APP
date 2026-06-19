import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "`${import.meta.env.VITE_API_URL}`/api/admin/login",
      {
        username,
        password,
      }
    );

    localStorage.removeItem(
      "token"
    );

    localStorage.setItem(
      "adminToken",
      response.data.token
    );

    alert(
      "Admin Login Successful"
    );

    window.location.href =
      "/admin/dashboard";
  } catch (error) {
    console.error(error);

    alert("Login Failed");
  }
};
  return (
    <div>
      <h1>Admin Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br />
        <br />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;