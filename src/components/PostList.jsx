import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Post from "./Post";

import classes from "./PostList.module.css";

function PostList() {
  // isPosting helps to tell whether the modalIsVisible is true or false ...so basically this state value is coming from the parent component which is app.jsx
  const posts = useLoaderData();

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
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              author={post.author}
              body={post.body}
            />
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
