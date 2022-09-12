import { useState, useContext } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { axiosInstace } from "../../config";
import { Context } from "../../context/Context";
import "./settings.css";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "https://different-fox-tuxedo.cyclic.app/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axiosInstace.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axiosInstace.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Perbarui akun</span>
          <span className="settingsTitleDelete">Hapus akun</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Foto profil</label>
          <div className="settingsPP">
            <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input id="fileInput" type="file" style={{ display: "none" }} className="settingsPPInput" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <label>Nama user</label>
          <input type="text" placeholder={user.username} name="name" onChange={(e) => setUsername(e.target.value)} />
          <label>Email</label>
          <input type="email" placeholder={user.email} name="email" onChange={(e) => setEmail(e.target.value)} />
          <label>Kata sandi</label>
          <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
          <button className="settingsSubmitButton" type="submit">
            Perbarui
          </button>
          {success && <span style={{ color: "green" }}>Profil telah diperbarui...</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
