import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import { axiosInstace } from "../../config";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axiosInstace.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Daftar</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Nama user</label>
        <input type="text" className="registerInput" placeholder="namauser..." onChange={(e) => setUsername(e.target.value)} />
        <label>Email</label>
        <input type="email" className="registerInput" placeholder="email..." onChange={(e) => setEmail(e.target.value)} />
        <label>Kata sandi</label>
        <input type="password" className="registerInput" placeholder="kata sandi..." onChange={(e) => setPassword(e.target.value)} />
        <button className="registerButton" type="submit">
          Daftar
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Masuk
        </Link>
      </button>
      {error && <span style={{ color: "red", marginTop: "10px" }}>Terjadi kesalahan!</span>}
    </div>
  );
}
