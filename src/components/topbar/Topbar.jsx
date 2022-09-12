import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function Topbar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fa-brands topIcon fa-facebook-square"></i>
        <i className="topIcon fa-brands topIcon fa-square-twitter"></i>
        <i className="topIcon fa-brands topIcon fa-square-instagram"></i>
        <i className="topIcon fa-brands fa-square-pinterest"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              AWAL
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              TENTANG
            </Link>
          </li>

          <li className="topListItem">
            <Link className="link" to="/">
              KONTAK
            </Link>
          </li>

          <li className="topListItem">
            <Link className="link" to="write">
              TULIS
            </Link>
          </li>

          <li className="topListItem" onClick={handleLogout}>
            {user && "KELUAR"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="settings">
            <img className="topImg" src={PF + user.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="login">
                MASUK
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="register">
                DAFTAR
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
