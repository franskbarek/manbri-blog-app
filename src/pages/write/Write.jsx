import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { Context } from "../../context/Context";
import "./write.css";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  return (
    <div className="write">
      {file && <img className="writeImg" src={URL.createObjectURL(file)} alt="" />}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-mountain-sun"></i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
          <input className="writeInput" placeholder="Cover dan judul" type="text" autoFocus={true} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="writeFormGroup">
          <textarea className="writeInput writeText" placeholder="Tulis ceritamu..." type="text" autoFocus={true} onChange={(e) => setDesc(e.target.value)} />
        </div>
        <button className="writeSubmit" type="submit">
          Publikasi
        </button>
      </form>
    </div>
  );
}
