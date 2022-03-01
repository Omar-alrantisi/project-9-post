import React, { useEffect, useState } from "react";
import "./posts.css";
import Comments from "../Comments/Comments";
import faker from "@faker-js/faker";

function Posts() {
  const [input, setInput] = useState("");
  const [input1, setInput1] = useState("");
  const [post, setPost] = useState([]);
  const [count, setCount] = useState(1);

  if (!localStorage.getItem("count")) {
    localStorage.setItem("count", 1);
  }

  useEffect(() => {
    if (localStorage.getItem("count")) {
      setCount(JSON.parse(localStorage.getItem("count")));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("post")) {
      setPost(JSON.parse(localStorage.getItem("post")));
    }
  }, []);
  const changeHandler = (e) => {
    const newInput = e.target.value;
    setInput(newInput);
  };

  const changeHandler1 = (e) => {
    const newInput1 = e.target.value;

    setInput1(newInput1);
  };

  const submitForm = (e) => {
    e.preventDefault();
    var userPost = {
      postId: count,
      postContent: input,
    };
    if (localStorage.getItem("post")) {
      let arr = JSON.parse(localStorage.getItem("post"));
      arr.push(userPost);
      localStorage.setItem("post", JSON.stringify(arr));
    } else {
      localStorage.setItem("post", JSON.stringify([userPost]));
    }
    localStorage.setItem("count", JSON.stringify(count + 1));
    setCount(count + 1);
    setPost([...post, userPost]);
    setInput("");
  };

  return (
    <div className="container">
      <form>
        <div class="ui input add-post">
          <input
            type="text"
            placeholder="Title"
            onChange={changeHandler}
            value={input}
          />
          <button class="ui secondary button" onClick={submitForm}>
            Post
          </button>
        </div>
        {/* <input type="text" placeholder='Please Enter Your Name!' onChange={changeHandler} value={input} />
              <button onClick={submitForm} >Add</button> */}
      </form>

      {post.map((posts) => (
        <div class="ui cards">
          <div class="card">
            <div class="content">
              {/* <img class="right floated mini ui image" src={faker.image.avatar()}/> */}
              <div class="header">{posts.postContent}</div>
              <div class="meta">{/* {faker.phone.phoneNumber()} */}</div>
              <div class="description">
                {/* {faker.finance.transactionDescription()} */}
              </div>
            </div>
            <div class="extra content">
              <div class="ui two buttons"></div>
              {/* send postId  */}
              <Comments postId={posts.postId} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;
