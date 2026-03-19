import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: "",
    emailId: "",
    mobileNumber: "",
    password: "",
  });

  const register = async () => {
    try {
      const res = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("User Registered Successfully");
        navigate("/");
      } else {
        alert("Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="login-body"> {/* important wrapper */}
      <div className="register-card">
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Username"
          value={form.userName}
          onChange={(e) =>
            setForm({ ...form, userName: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={form.emailId}
          onChange={(e) =>
            setForm({ ...form, emailId: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Mobile Number"
          value={form.mobileNumber}
          onChange={(e) =>
            setForm({ ...form, mobileNumber: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="login-btn" onClick={register}>
          Register
        </button>

        <Link to="/">Already have an account? Login</Link>
      </div>
    </div>
  );
}

export default Register;