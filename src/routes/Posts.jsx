import { Outlet } from "react-router-dom";
// import { M } from "vite/dist/node/types.d-AKzkD8vd";
import PostList from "../components/PostList";

function Posts() {
  return (
    <>
      <Outlet />
      <main>
        <PostList />
      </main>
    </>
  );
}

export default Posts;

export async function loader(){
  const response = await fetch("http://localhost:8080/posts");
  const resData = await response.json();
  return resData.posts;
  
}