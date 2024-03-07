import React, { useEffect, useState } from "react";
// import QuoraBox from "./QuoraBox";
import "./css/Feed.css";
import Post from "./Post";
import axios from "axios";
// import { useSelector } from "react-redux";
// import { selectUser } from "../feature/userSlice";


function Feed() {
  const [posts, setPosts] = useState([]);
  // const user = useSelector(selectUser);
  useEffect(() => {
    axios
      .get("/api/questions")
      .then((res) => {
        console.log(res.data.reverse());
        setPosts(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className="feed">
      {/* <QuoraBox /> */}
      {posts.map((post, index) => (
        <Post key={index} post={post}  />
      ))}
      {/* <Post />
      <Post />
      <Post />
      <Post />
      <Post /> */}
    </div>
  );
}

export default Feed;