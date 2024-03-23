import { useState } from "react";
import Post from "./Post";
import NewPost from "./NewPost";
import Modal from "./Modal";
import classes from "./PostList.module.css";

function PostList({isPosting , onStopPosting }) {  // isPosting helps to tell whether the modalIsVisible is true or false ...so basically this state value is coming from the parent component which is app.jsx
  const [enteredBody, setEnteredBody] = useState("");
  const [enteredAuthor, setEnteredAuthor] = useState("");

  function bodyChangeHandler(event) {
    setEnteredBody(event.target.value);
  }
  function onAuthorChangeHandler(event) {
    setEnteredAuthor(event.target.value);
  }
  

  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost
            onBodyChange={bodyChangeHandler}
            onAuthorChange={onAuthorChangeHandler}
          />
        </Modal>
      )}
      <ul className={classes.posts}>
        <Post author={enteredAuthor} body={enteredBody} />
        <Post author=" Manuel " body="ReactJs is awesome !!" />
      </ul>
    </>
  );
}
export default PostList;
