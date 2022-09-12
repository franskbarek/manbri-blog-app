import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "https://different-fox-tuxedo.cyclic.app/images/";
  console.log(PF);
  return (
    <div className="post">
      <img className="postImg" src={PF + post.photo} alt="" />
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat">{c.name}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toLocaleDateString("id-ID")}</span>
      </div>
      <p className="postDesc">{post.desc}</p>
      <span className="postDate">Author: {post.username}</span>
    </div>
  );
}
