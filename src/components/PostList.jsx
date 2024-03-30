import { useState, useEffect } from "react";
import Post from "./Post";
import NewPost from "./NewPost";
import Modal from "./Modal";
import classes from "./PostList.module.css";

function PostList({ isPosting, onStopPosting }) {
  // isPosting helps to tell whether the modalIsVisible is true or false ...so basically this state value is coming from the parent component which is app.jsx
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("http://localhost:8080/posts");
      const resData = await response.json();
      setPosts(resData.posts);
    }
    fetchPosts();
  }, []);

  // function addPostHandler(postData) {
  //   fetch("http//localhost:8080/posts", {
  //     method: "POST",
  //     body: JSON.stringify(postData),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   setPosts((existingPosts) => [postData, ...existingPosts]);
  // }
  async function addPostHandler(postData) {
    const response = await fetch("http://localhost:8080/posts", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // Server successfully store-+-+d the post
      const newPost = await response.json();
      setPosts((existingPosts) => [newPost.post, ...existingPosts]);
    } else {
      // Handle error
      console.error("Failed to store post:", response.status);
    }
  }
  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
        </Modal>
      )}
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.body} author={post.author} body={post.body} />
          ))}
        </ul>
      )}
      {posts.length == 0 && (
        <div style={{ textAlign: "center", color: "while" }}>
          <h2> There are no posts yet...</h2>
          <p>Start adding some!</p>
        </div>
      )}
    </>
  );
}
export default PostList;
