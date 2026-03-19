import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });

      if (!res.ok) {
        const error = await res.text();
        alert(error);
        return;
      }

      const data = await res.json();

      localStorage.setItem("token", data.token);

      navigate("/wallet");

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="login-body">
      <div className="login-card">
        <h2>Digital Wallet</h2>

        <input
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={login}>
          Login
        </button>

        <br /><br />
        <Link to="/register">Create Account</Link>
      </div>
    </div>
  );
}

export default Login;