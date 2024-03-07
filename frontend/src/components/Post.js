import { Avatar } from "@material-ui/core";
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  ChatBubbleOutlined,
  MoreHorizOutlined,
  // RepeatOneOutlined,
  ShareOutlined,
} from "@material-ui/icons";
import React, { useState } from "react";
import "./css/Post.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import CloseIcon from "@material-ui/icons/Close";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactTimeAgo from "react-time-ago";
import axios from "axios";
import ReactHtmlParser from "html-react-parser";
import { useSelector } from "react-redux";
import { selectUser } from "../feature/userSlice";

function LastSeen({ date }) {
  return (
    <div>
      <ReactTimeAgo date={date} locale="en-US" timeStyle="round" />
    </div>
  );
}

function Post({ post , userEmail}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [likes, setLikes] = useState(post.upvotes || 0);
  const [dislikes, setDislikes] = useState(post.downvotes || 0);
  const Close = <CloseIcon />;

  const user = useSelector(selectUser);
  const username = post?.user?.email ? post?.user?.email.split("@")[0] : '';
  let name = "";

  if (user && user.email) {
    const parts = user.email.split("@");
    name = parts[0];
  }

  const handleQuill = (value) => {
    setAnswer(value);
  };

  const handleSubmit = async () => {
    if (post?._id && answer !== "") {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        answer: answer,
        questionId: post?._id,
        user: user,
      };
      await axios
        .post("/api/answers", body, config)
        .then((res) => {
          console.log(res.data);
          alert("Comment added successfully");
          setIsModalOpen(false);
          window.location.href = "/";
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleShare = () => {
    const postLink = window.location.href + `post/${post?._id}`;
    navigator.clipboard.writeText(postLink);
    alert("Post link copied to clipboard.");
  };

  const handleLike = () => {
    // Only allow user to vote if they are logged in
    if (!user) {
      alert("Please log in to vote.");
      return;
    }

    // If the user has already liked the post, remove their like
    if (likes === 1) {
      setLikes(0);
    }
    // If the user has not liked the post, add their like and remove their dislike if they have previously disliked the post
    else {
      setLikes(1);
      if (dislikes === 1) {
        setDislikes(0);
      }
    }
  };

  const handleDislike = () => {
    // Only allow user to vote if they are logged in
    if (!user) {
      alert("Please log in to vote.");
      return;
    }

    // If the user has already disliked the post, remove their dislike
    if (dislikes === 1) {
      setDislikes(0);
    }
    // If the user has not disliked the post, add their dislike and remove their like if they have previously liked the post
    else {
      setDislikes(1);
      if (likes === 1) {
        setLikes(0);
      }
    }
  };

  return (
    <div className="post">
      <div className="post__info">
        <h4>{username} </h4>
        {/* <h4>{post?.user?.userName}</h4> */}

        <small>
          <LastSeen date={post?.createdAt} />
        </small>
      </div>
      <div className="post__body">
        <div className="post__question">
          {post?.questionName}
          <button
            onClick={() => {
              setIsModalOpen(true);
              console.log(post?._id);
            }}
            className="post__btnAnswer"
          >
            Comment
          </button>
          
          <Modal
            open={isModalOpen}
            closeIcon={Close}
            onClose={() => setIsModalOpen(false)}
            closeOnEsc
            center
            closeOnOverlayClick={false}
            styles={{
              overlay: {
                height: "auto",
              },
            }}
          >
            <div className="modal__question">
              <h1>{post?.questionName}</h1>
              <div className="modal__askedby">
                posted by <span className="name">{post?.user?.userName}{name}</span> on{" "}
                <span className="name">
                  {new Date(post?.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="modal__answer">
              <ReactQuill
                value={answer}
                onChange={handleQuill}
                placeholder="Enter your comment"
              />
            </div>
            <div className="modal__button">
              <button className="cancle" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button onClick={handleSubmit} type="submit" className="add">
                Add comment
              </button>
            </div>
          </Modal>
        </div>
        {post.questionUrl !== "" && <img src={post.questionUrl} alt="url" />}
      </div>
      <div className="post__footer">
        <div className="post__footerAction">
          <ArrowUpwardOutlined onClick={handleLike} className={likes === 1 ? "active" : ""} />
          <span className="post__voteCount">{likes}</span>
          <span className="post__voteLabel">Likes</span>
          <ArrowDownwardOutlined onClick={handleDislike} className={dislikes === 1 ? "active" : ""} />
          <span className="post__voteCount">{dislikes}</span>
          <span className="post__voteLabel"> Dislikes</span>
        </div>
        {/* <RepeatOneOutlined className="post__repeat" /> */}
        <ChatBubbleOutlined className="post__commentIcon" />   
        <span className="post__commentIcon">{post?.allAnswers?.length || 0}</span>
        <div className="post__footerRight">
          <ShareOutlined onClick={handleShare} />
          <MoreHorizOutlined />
        </div>
      </div>
      <div className="post__comments">
        {Array.isArray(post?.allAnswers) && post.allAnswers.map((ans) => (
          <p className="post__comment">
            <Avatar src={ans?.user?.photo} />
            <span className="post__commentUser">{ans?.user?.userName}</span>
            <span className="post__commentText">{ReactHtmlParser(ans?.answer)}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

export default Post;