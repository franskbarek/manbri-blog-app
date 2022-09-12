import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstace } from "../../config";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passRef = useRef();
  const [error, setError] = useState(false);
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axiosInstace.post("/auth/login", {
        username: userRef.current.value,
        password: passRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      setError(true);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Masuk</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Nama user</label>
        <input type="text" className="loginInput" placeholder="namauser..." ref={userRef} />
        <label>Kata sandi</label>
        <input type="password" className="loginInput" placeholder="kata sandi..." ref={passRef} />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Masuk
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Daftar
        </Link>
      </button>
      {error && <span style={{ color: "red", marginTop: "10px" }}>Terjadi kesalahan!</span>}
    </div>
  );
}
